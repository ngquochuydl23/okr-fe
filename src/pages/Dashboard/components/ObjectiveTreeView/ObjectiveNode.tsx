import { Handle, Position } from '@xyflow/react';
import { memo, useCallback, useState } from 'react';
import styles from './objective-tree-view.module.scss';
import _, { last } from 'lodash';
import type { ObjectiveItem } from '@/api/objective/dto';
import Avatar from "@/components/Avatar";
import ProgressBar from "@ramonak/react-progress-bar";
import { Icon } from "@bosch/react-frok";
import clsx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router';
import { useAsyncFn } from 'react-use';
import { ObjectiveService } from '@/api/objective';
import type { CheckInHistory } from '@/api/checkin/dto';
import { CheckInTypeEnum } from '@/enums/checkin.enum';
import Chip from '@mui/material/Chip';
import { Badge } from "@bosch/react-frok";
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';

export type ObjectiveNodeData = {
  id: string;
  data: {
    level: number;
    objective: ObjectiveItem;
    parentId: number | null;
    childs: ObjectiveItem[];
    onLoadedChildObjectives: (parentId: number, objectives: ObjectiveItem[]) => void;
  }
}

const ObjectiveNode = memo((props) => {
  const { t } = useTranslation();
  const { objective, onLoadedChildObjectives, childs } = (props as ObjectiveNodeData).data;
  const [isExpanded, setIsExpanded] = useState(false);
  const [{ loading }, getChilds] = useAsyncFn(async () => {
    if (!objective) {
      return [];
    }

    try {
      const response = (await ObjectiveService.getByParentId(objective.id)) || [];
      onLoadedChildObjectives(objective.id, response);
      setIsExpanded(true);
    } catch (error) {
      console.error('Failed to load child objectives', error);
    }
  }, [objective]);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      onLoadedChildObjectives(objective.id, []);
    } else {
      if (childs && childs.length > 0) {
        setIsExpanded(true);
      } else {
        getChilds();
      }
    }
  };

  const mapStatusFromObjective = useCallback((objective?: ObjectiveItem) => {
    if (!objective || _.isEmpty(objective.checkins)) {
      return styles.notCheckInYet;
    }

    const doneCheckins = objective.checkins.filter((checkIn: CheckInHistory) => checkIn.status === CheckInTypeEnum.DONE);
    if (_.isEmpty(doneCheckins)) {
      return styles.notCheckInYet;
    }

    const latestCheckin = doneCheckins.sort((a, b) => new Date(b.checkinAt).getTime() - new Date(a.checkinAt).getTime())[0];
    if (latestCheckin.nextCheckinDate) {
      const now = Date.now();
      return new Date(latestCheckin.nextCheckinDate).getTime() < now
        ? styles.overDue
        : styles.inDue;
    }

    return styles.notCheckInYet;
  }, [objective]);


  const mapChipStyle = useCallback((objective?: ObjectiveItem) => {
    if (!objective || _.isEmpty(objective.checkins)) {
      return {
        label: t('PAGES.DASHBOARD.OVERALL_STATUS.NOT_AVAILABLE'),
        badge: 'warning'
      };
    }

    const doneCheckins = objective.checkins.filter((checkIn: CheckInHistory) => checkIn.status === CheckInTypeEnum.DONE);
    if (_.isEmpty(doneCheckins)) {
      return {
        label: t('PAGES.DASHBOARD.OVERALL_STATUS.NOT_AVAILABLE'),
        badge: 'warning'
      };
    }

    const latestCheckin = doneCheckins.sort((a, b) => new Date(b.checkinAt).getTime() - new Date(a.checkinAt).getTime())[0];
    if (latestCheckin.confidentLevel) {
      const styleMap = [
        { label: t('PAGES.DASHBOARD.OVERALL_STATUS.STABLE'), badge: 'success' },
        { label: t('PAGES.DASHBOARD.OVERALL_STATUS.NORMAL'), badge: 'info' },
        { label: t('PAGES.DASHBOARD.OVERALL_STATUS.NOT_GOOD'), badge: 'error' }
      ];
      return styleMap[latestCheckin.confidentLevel - 1] || {
        label: t('PAGES.DASHBOARD.OVERALL_STATUS.NOT_AVAILABLE'),
        badge: 'warning'
      };
    }

    return {
      label: t('PAGES.DASHBOARD.OVERALL_STATUS.NOT_AVAILABLE'),
      badge: 'warning'
    };
  }, [objective]);

  return (
    <div className={clsx(styles.objectiveNodeContainer, { [styles.loadingChild]: loading })}>
      <div className={clsx(styles.objectiveNode, mapStatusFromObjective(objective))}>
        <Handle type="target" position={Position.Top} />
        <div className={styles.title}>
          <Tooltip title={objective?.title}>
            <Link to={`/objective/${objective.id}`} className={styles.objectiveLink} target='_blank'>
              {objective?.title}
            </Link>
          </Tooltip>
        </div>
        <div className={styles.chipContainer}>
          <Chip variant="filled" size="small"
            label={
              <div className={styles.chipStatus}>
                <Badge type={mapChipStyle(objective).badge as never} className={styles.badgeStatus} />
                {mapChipStyle(objective).label}
              </div>
            } />
        </div>
        <div className={styles.owner}>
          <Avatar size='sm' />
          <div className={styles.ownerInfo}>
            <div className={styles.ownerName}>{objective?.owner?.fullName}</div>
          </div>
        </div>
        <ProgressBar
          borderRadius="0"
          labelAlignment="right"
          barContainerClassName={styles.container}
          labelClassName={styles.label}
          bgColor="#18837e"
          height="15px"
          completed={objective.progress} />
        {_.map(childs, ({ id }) => (
          <Handle
            key={id}
            type="source"
            position={Position.Bottom}
            id={id.toString()}
            isConnectable
          />
        ))}
      </div>
      {objective?.hasChildren &&
        <Tooltip title={isExpanded ? t("PAGES.DASHBOARD.HIDE_CHILD_OBJECTIVES_TOOLTIP") : t("PAGES.DASHBOARD.VIEW_CHILD_OBJECTIVES_TOOLTIP")}>
          <div className={styles.showChildNodeBtn} onClick={handleToggle}>
            {loading && <CircularProgress size={"16px"} sx={{ color: 'white' }} />}
            {!loading && <Icon iconName={isExpanded ? "up-small" : "down-small"} />}
          </div>
        </Tooltip>
      }
    </div>
  );
});

export default ObjectiveNode; 