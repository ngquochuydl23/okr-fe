import { IconButton, Popover, Progress, Text } from '@radix-ui/themes';
import './mission-card.scss';
import { SiTicktick } from "react-icons/si";
import { RiMoreFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

interface MissionCardProps {
  id: string;
  name: string;
  isCompleted: boolean;
  percentage: number;
  description?: string | null;
}

const MissionCard = ({ isCompleted, percentage, name, description }: MissionCardProps) => {
  return (
    <div className={`mission-card ${isCompleted ? 'mission-card--completed' : ''}`}>
      <div className='mission-card__header'>
        <div className='mission-card__title-row'>
          {isCompleted && (
            <span className='mission-card__badge'>
              <SiTicktick />
            </span>
          )}
          <Text size="3" weight="bold" className='mission-card__title'>
            {name}
          </Text>
        </div>
        <Popover.Root>
          <Popover.Trigger>
            <IconButton variant='ghost' size="1">
              <RiMoreFill />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content width="150px" className='popover-content'>
            <div className="popover-content-item">
              <span><RiDeleteBin6Line /></span>
              Delete
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>

      {description && (
        <Text size="2" color="gray" className='mission-card__description'>
          {description}
        </Text>
      )}

      <div className='mission-card__progress'>
        <div className='mission-card__progress-header'>
          <Text size="1" weight="medium" color="gray">Progress</Text>
          <Text size="2" weight="bold" className='mission-card__percentage'>
            {percentage}%
          </Text>
        </div>
        <Progress value={percentage} size="2" />
      </div>
    </div>
  );
};

export default MissionCard;