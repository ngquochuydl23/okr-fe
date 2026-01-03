import { Card, Heading, Text, Flex, Button, Badge, DataList } from "@radix-ui/themes";
import { TbTargetArrow, TbPlus } from "react-icons/tb";

export default function WorkspaceObjectives() {
  const mockObjectives = [
    {
      id: "1",
      title: "Improve Platform Reliability",
      description: "Enhance system uptime and reduce incidents",
      progress: 75,
      status: "On Track",
      owner: "Engineering Team",
      dueDate: "Q1 2026",
    },
    {
      id: "2",
      title: "Expand Market Presence",
      description: "Increase customer acquisition in key markets",
      progress: 60,
      status: "On Track",
      owner: "Sales Team",
      dueDate: "Q2 2026",
    },
    {
      id: "3",
      title: "Enhance Product Features",
      description: "Deliver high-value features to customers",
      progress: 45,
      status: "At Risk",
      owner: "Product Team",
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
            Workspace Objectives
          </Heading>
          <Text color="gray" size="2">
            Organization-wide objectives and key results
          </Text>
        </div>
        <Button size="3">
          <TbPlus size={18} />
          New Objective
        </Button>
      </Flex>

      <Flex direction="column" gap="4">
        {mockObjectives.map((objective) => (
          <Card key={objective.id} style={{ padding: "1.5rem" }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Flex align="center" gap="2">
                  <TbTargetArrow size={24} color="var(--blue-9)" />
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
                  <DataList.Label>Owner</DataList.Label>
                  <DataList.Value>{objective.owner}</DataList.Value>
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
                            background: "var(--blue-9)",
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
