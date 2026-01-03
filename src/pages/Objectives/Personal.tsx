import { Card, Heading, Text, Flex, Button, Badge, DataList } from "@radix-ui/themes";
import { TbTargetArrow, TbPlus } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

export default function PersonalObjectives() {
  const mockPersonalObjectives = [
    {
      id: "1",
      title: "Enhance Technical Skills",
      description: "Master new technologies and frameworks",
      progress: 80,
      status: "On Track",
      category: "Professional Development",
      dueDate: "Q1 2026",
    },
    {
      id: "2",
      title: "Improve Leadership Skills",
      description: "Develop mentoring and coaching abilities",
      progress: 55,
      status: "On Track",
      category: "Career Growth",
      dueDate: "Q2 2026",
    },
    {
      id: "3",
      title: "Complete Certification",
      description: "Obtain cloud architecture certification",
      progress: 40,
      status: "At Risk",
      category: "Professional Development",
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
            Personal Objectives
          </Heading>
          <Text color="gray" size="2">
            Your individual goals and professional development objectives
          </Text>
        </div>
        <Button size="3">
          <TbPlus size={18} />
          New Personal Objective
        </Button>
      </Flex>

      <Flex direction="column" gap="4">
        {mockPersonalObjectives.map((objective) => (
          <Card key={objective.id} style={{ padding: "1.5rem" }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Flex align="center" gap="2">
                  <CgProfile size={24} color="var(--green-9)" />
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
                  <DataList.Label>Category</DataList.Label>
                  <DataList.Value>
                    <Badge color="blue" variant="soft">
                      {objective.category}
                    </Badge>
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
                            background: "var(--green-9)",
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
