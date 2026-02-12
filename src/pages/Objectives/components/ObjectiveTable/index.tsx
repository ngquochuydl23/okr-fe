import { useState, useEffect, Fragment } from "react";
import { Text, Flex, Button, Badge, Table, Progress, IconButton, HoverCard, Avatar, Box, Heading, TextField, Select } from "@radix-ui/themes";
import { TbTargetArrow, TbChevronRight, TbChevronDown, TbSearch, TbPlus } from "react-icons/tb";
import Pagination from "@/components/Pagination";
import { DEFAULT_COLUMNS, type ObjectiveTableColumn, type ObjectiveTypeValue } from "./objective-table.config";
import { HiOutlineFlag } from "react-icons/hi";
import { ObjectiveType } from "@/constants/objective.constants";

export interface KeyResult {
  id: string;
  title: string;
  progress: number;
  status: string;
  owner: string;
  dueDate: string;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  cycle: {
    id: string,
    name: string;
  }
  owner: {
    id: string;
    fullName: string;
    avatar: string;
  };
  team?: {
    id: string;
    name: string
  } | null;
  dueDate: string;
  keyResults: KeyResult[];
}

export interface ObjectiveTableProps {
  title: string;
  objectives: Objective[];
  columns?: ObjectiveTableColumn[];
  showActions?: boolean;
  color?: string;
  type: ObjectiveTypeValue;
}

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

export default function ObjectiveTable({
  title,
  objectives,
  columns = DEFAULT_COLUMNS,
  showActions = true,
  color = "var(--blue-9)",
  type,

}: ObjectiveTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => { }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);


  const handleCreateOKR = () => {

  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      <Heading size="5">{title}</Heading>
      <Flex justify="between" align="center" mb="4" mt="4">
        <Flex gap="3" align="center">
          <TextField.Root
            variant="surface"
            placeholder="Search objectives..."
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <TextField.Slot>
              <TbSearch size="16" />
            </TextField.Slot>
          </TextField.Root>
          <Select.Root defaultValue="all">
            <Select.Trigger variant="surface" placeholder="Status" />
            <Select.Content>
              <Select.Item value="all">All Status</Select.Item>
              <Select.Item value="on-track">On Track</Select.Item>
              <Select.Item value="at-risk">At Risk</Select.Item>
              <Select.Item value="behind">Behind</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="q1-2026" >
            <Select.Trigger variant="surface" placeholder="Cycles" />
            <Select.Content>
              <Select.Item value="q1-2026">Q1 2026</Select.Item>
              <Select.Item value="q2-2026">Q2 2026</Select.Item>
              <Select.Item value="q4-2025">Q4 2025</Select.Item>
            </Select.Content>
          </Select.Root>
          {type === ObjectiveType.TEAM &&
            <Select.Root defaultValue="q1-2026" >
              <Select.Trigger variant="surface" placeholder="Team" />
              <Select.Content>
                <Select.Item value="q1-2026">Export Control Team</Select.Item>
                <Select.Item value="q2-2026">Container Shipment Team</Select.Item>
              </Select.Content>
            </Select.Root>
          }
        </Flex>
        {type !== ObjectiveType.SUPPORTING &&
          <Button size="2" onClick={handleCreateOKR}>
            <TbPlus size={16} /> New Objective
          </Button>
        }
      </Flex>
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            {columns.map((col) =>
              <Table.ColumnHeaderCell key={col.key} align={col.align}>
                {col.label}
              </Table.ColumnHeaderCell>)}
            {showActions && <Table.ColumnHeaderCell align="right"></Table.ColumnHeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {objectives.map((objective) => {
            const isExpanded = expandedIds.has(objective.id);
            return (
              <Fragment key={objective.id}>
                <Table.Row align="center">
                  {columns.map((col) => {
                    switch (col.key) {
                      case "title":
                        return (
                          <Table.RowHeaderCell key={col.key} style={{ maxWidth: "200px" }}>
                            <Flex align="center" gap="2" style={{ minWidth: 0 }}>
                              <IconButton
                                variant="ghost"
                                size="1"
                                onClick={() => toggleExpand(objective.id)}
                                style={{ flexShrink: 0 }}
                              >
                                {expandedIds.has(objective.id) ? <TbChevronDown size={16} /> : <TbChevronRight size={16} />}
                              </IconButton>
                              <TbTargetArrow color={color} size={'18px'} style={{ flexShrink: 0 }} />
                              <Text size="2" weight="medium" truncate>{objective.title}</Text>
                            </Flex>
                          </Table.RowHeaderCell>
                        );
                      case "status":
                        return (
                          <Table.Cell key={col.key}>
                            <Badge color={getStatusColor(objective.status) as any}>
                              {objective.status}
                            </Badge>
                          </Table.Cell>
                        );
                      case "cycle":
                        return (
                          <Table.Cell key={col.key}>
                            <Badge>
                              <Text weight="medium">{objective.cycle.name}</Text>
                            </Badge>
                          </Table.Cell>
                        );
                      case "progress":
                        return (
                          <Table.Cell key={col.key}>
                            <Flex align="center" gap="2" maxWidth="200px">
                              <Progress value={objective.progress} size="2" style={{ width: "120px" }} />
                              <Text size="1" weight="medium">
                                {objective.progress}%
                              </Text>
                            </Flex>
                          </Table.Cell>
                        );
                      case "team":
                        return (
                          <Table.Cell key={col.key}>
                            <Text size="2" weight="medium">
                              {objective.team?.name}
                            </Text>
                          </Table.Cell>
                        )
                      case "owner":
                        return (
                          <Table.Cell key={col.key}>
                            <HoverCard.Root>
                              <HoverCard.Trigger>
                                <Flex align="center" gap="2" style={{ cursor: "pointer" }}>
                                  <Avatar
                                    size="1"
                                    radius="full"
                                    src={objective.owner.avatar}
                                    fallback={objective.owner.fullName.charAt(0)}
                                  />
                                  <Text size="2" weight="medium">{objective.owner.fullName}</Text>
                                </Flex>
                              </HoverCard.Trigger>
                              <HoverCard.Content maxWidth="300px" size="1">
                                <Flex gap="3" align="center">
                                  <Avatar
                                    size="3"
                                    radius="full"
                                    src={objective.owner.avatar}
                                    fallback={objective.owner.fullName.charAt(0)}
                                  />
                                  <Box>
                                    <Heading size="2" as="h3">{objective.owner.fullName}</Heading>
                                    <Text as="div" size="1" color="gray">
                                      ID: {objective.owner.id}
                                    </Text>
                                  </Box>
                                </Flex>
                              </HoverCard.Content>
                            </HoverCard.Root>
                          </Table.Cell>
                        );
                      default:
                        return (
                          <Table.Cell key={col.key}>
                            <Text size="2">{String(objective[col.key] ?? "")}</Text>
                          </Table.Cell>
                        );
                    }
                  })}
                  {showActions && (
                    <Table.Cell align="right">
                      <Flex gap="4" justify="end" align="center">
                        <Button variant="soft" size="1">
                          Details
                        </Button>
                        <Button variant="ghost" size="1">
                          Edit
                        </Button>
                      </Flex>
                    </Table.Cell>
                  )}
                </Table.Row>

                {/* KEY RESULTS */}
                {isExpanded &&
                  objective.keyResults.map((keyResult) => (
                    <Table.Row
                      key={keyResult.id}
                      align="center"
                      style={{ backgroundColor: "var(--gray-2)" }}
                    >
                      {columns.map((col) => {
                        switch (col.key) {
                          case "title":
                            return (
                              <Table.Cell key={col.key} style={{ paddingLeft: "48px" }}>
                                <Flex align="center" gap="2">
                                  <HiOutlineFlag size={14} color="var(--gray-9)" />
                                  <Text size="2" color="gray">{keyResult.title}</Text>
                                </Flex>
                              </Table.Cell>
                            );
                          case "progress":
                            return (
                              <Table.Cell key={col.key}>
                                15/100%
                              </Table.Cell>
                            );
                          default: {
                            return (
                              <Table.Cell key={col.key}>
                                <Text size="1" color="gray">-</Text>
                              </Table.Cell>
                            );
                          }
                        }
                      })}
                      {showActions && (
                        <Table.Cell align="right">
                          <Flex gap="4" justify="end" align="center">
                            <Button variant="ghost" size="1">
                              Edit
                            </Button>
                          </Flex>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))
                }
              </Fragment>
            );
          })}
        </Table.Body>
      </Table.Root>

      <Pagination
        page={1}
        pageSize={10}
        total={100}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />

    </div >
  );
}
