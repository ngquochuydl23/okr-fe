import { Card, Heading, Text, Flex, Button, Badge, DataList } from "@radix-ui/themes";
import { TbTargetArrow, TbPlus } from "react-icons/tb";
import { HiOutlineSupport } from "react-icons/hi";

export default function SupportingObjectives() {
  const mockSupportingObjectives = [
    {
      id: "1",
      title: "Support Infrastructure Upgrade",
      description: "Assist in migrating legacy systems to cloud",
      progress: 70,
      status: "On Track",
      supportingFor: "Platform Reliability Initiative",
      priority: "High",
      dueDate: "Q1 2026",
    },
    {
      id: "2",
      title: "Documentation Enhancement",
      description: "Create comprehensive API documentation",
      progress: 45,
      status: "On Track",
      supportingFor: "Product Features Development",
      priority: "Medium",
      dueDate: "Q2 2026",
    },
    {
      id: "3",
      title: "Quality Assurance Process",
      description: "Establish automated testing framework",
      progress: 30,
      status: "At Risk",
      supportingFor: "Accelerate Delivery",
      priority: "High",
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <Flex justify="between" align="center" mb="5">
        <div>
          <Heading size="6" mb="1">
            Supporting Objectives
          </Heading>
          <Text color="gray" size="2">
            Objectives that support and enable other key initiatives
          </Text>
        </div>
        <Button size="3">
          <TbPlus size={18} />
          New Supporting Objective
        </Button>
      </Flex>

      <Flex direction="column" gap="4">
        {mockSupportingObjectives.map((objective) => (
          <Card key={objective.id} style={{ padding: "1.5rem" }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Flex align="center" gap="2">
                  <HiOutlineSupport size={24} color="var(--orange-9)" />
                  <Heading size="4">{objective.title}</Heading>
                </Flex>
                <Flex gap="2">
                  <Badge color={getPriorityColor(objective.priority) as any} variant="soft">
                    {objective.priority}
                  </Badge>
                  <Badge color={getStatusColor(objective.status) as any}>
                    {objective.status}
                  </Badge>
                </Flex>
              </Flex>

              <Text color="gray" size="2">
                {objective.description}
              </Text>

              <DataList.Root>
                <DataList.Item>
                  <DataList.Label>Supporting For</DataList.Label>
                  <DataList.Value>
                    <Text size="2" weight="medium">
                      {objective.supportingFor}
                    </Text>
                  </DataList.Value>
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
                            background: "var(--orange-9)",
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
