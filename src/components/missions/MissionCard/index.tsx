import { Flex, IconButton, Popover, Progress, Text } from '@radix-ui/themes';
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
    <div className='mission-card'>
      <div className='mission-card__info'>
        <Flex justify="between">
          <Text size="3" weight="bold">
            {isCompleted && <span className='complete-marker'><SiTicktick color='green' /></span>}
            {name}
          </Text>
          <Popover.Root>
            <Popover.Trigger>
              <IconButton variant='ghost'>
                <RiMoreFill />
              </IconButton>
            </Popover.Trigger>
            <Popover.Content width="230px" className='popover-content'>
              <Flex gap="3">
                <div className="popover-content-item">
                  <span>
                    <RiDeleteBin6Line />
                  </span>
                  Delete
                </div>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <Text size="2" weight="regular" color="gray">{description}</Text>
      </div>
      <div className='mission-card__progress'>
        <Text size="2" weight="bold">Objective Progress:</Text>
        <div>
          <Flex justify="between">
            <Text size="1" weight="medium">{percentage}%</Text>
            <Text size="1" weight="medium">35/77</Text>
          </Flex>
          <Progress value={percentage} size="2" mt="2" />
        </div>
      </div>
    </div>
  )
}

export default MissionCard;