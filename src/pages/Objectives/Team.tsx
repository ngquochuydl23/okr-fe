import { Card, Heading, Text, Flex, Button, Badge, DataList, Avatar } from "@radix-ui/themes";
import { TbTargetArrow, TbPlus } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";

export default function TeamObjectives() {
  const mockTeamObjectives = [
    {
      id: "1",
      title: "Improve Team Productivity",
      description: "Streamline workflows and reduce bottlenecks",
      progress: 65,
      status: "On Track",
      team: "Engineering Team",
      members: 12,
      dueDate: "Q1 2026",
    },
    {
      id: "2",
      title: "Enhance Collaboration",
      description: "Foster better cross-functional communication",
      progress: 50,
      status: "On Track",
      team: "Product Team",
      members: 8,
      dueDate: "Q2 2026",
    },
    {
      id: "3",
      title: "Accelerate Delivery",
      description: "Reduce time-to-market for new features",
      progress: 35,
      status: "At Risk",
      team: "Development Team",
      members: 15,
      dueDate: "Q1 2026",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "green";
      case "At Risk":
        return "orange";
      case "Behind":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <Flex justify="between" align="center" mb="5">
        <div>
          <Heading size="6" mb="1">
            Team Objectives
          </Heading>
          <Text color="gray" size="2">
            Objectives aligned with team goals and initiatives
          </Text>
        </div>
        <Button size="3">
          <TbPlus size={18} />
          New Team Objective
        </Button>
      </Flex>

      <Flex direction="column" gap="4">
        {mockTeamObjectives.map((objective) => (
          <Card key={objective.id} style={{ padding: "1.5rem" }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Flex align="center" gap="2">
                  <RiTeamLine size={24} color="var(--purple-9)" />
                  <Heading size="4">{objective.title}</Heading>
                </Flex>
                <Badge color={getStatusColor(objective.status) as any}>
                  {objective.status}
                </Badge>
              </Flex>

              <Text color="gray" size="2">
                {objective.description}
              </Text>

              <DataList.Root>
                <DataList.Item>
                  <DataList.Label>Team</DataList.Label>
                  <DataList.Value>
                    <Flex align="center" gap="2">
                      <RiTeamLine size={16} />
                      {objective.team}
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Team Members</DataList.Label>
                  <DataList.Value>{objective.members} members</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Due Date</DataList.Label>
                  <DataList.Value>{objective.dueDate}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Progress</DataList.Label>
                  <DataList.Value>
                    <Flex align="center" gap="2">
                      <div
                        style={{
                          width: "100px",
                          height: "8px",
                          background: "var(--gray-4)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${objective.progress}%`,
                            height: "100%",
                            background: "var(--purple-9)",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <Text size="2" weight="medium">
                        {objective.progress}%
                      </Text>
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>

              <Flex gap="2" mt="2">
                <Button variant="soft" size="2">
                  View Details
                </Button>
                <Button variant="ghost" size="2">
                  Edit
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
