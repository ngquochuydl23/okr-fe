import { useState } from "react";
import { Text, Flex, Badge, Table, Progress, Heading, TextField, Select } from "@radix-ui/themes";
import { TbSearch } from "react-icons/tb";
import { HiOutlineFlag } from "react-icons/hi";
import Pagination from "@/components/Pagination";
import { DEFAULT_KEY_RESULT_COLUMNS, type KeyResultTableColumn } from "./key-result-table.config";

export interface KeyResultItem {
  id: string;
  title: string;
  progress: number;
  status: string;
  owner: string;
  dueDate: string;
  objectiveTitle: string;
  [key: string]: any;
}

export interface KeyResultTableProps {
  title: string;
  keyResults: KeyResultItem[];
  columns?: KeyResultTableColumn[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "On Track": return "green";
    case "Completed": return "green";
    case "At Risk": return "orange";
    case "Behind": return "red";
    default: return "gray";
  }
};

export default function KeyResultTable({
  title,
  keyResults,
  columns = DEFAULT_KEY_RESULT_COLUMNS,
}: KeyResultTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = keyResults.filter((kr) =>
    kr.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div className="flex flex-col">
      <Heading size="5">{title}</Heading>
      <Flex gap="3" align="center" mb="4" mt="4">
        <TextField.Root
          variant="surface"
          placeholder="Search key results..."
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
        <Select.Root defaultValue="q1-2026">
          <Select.Trigger variant="surface" placeholder="Cycles" />
          <Select.Content>
            <Select.Item value="q1-2026">Q1 2026</Select.Item>
            <Select.Item value="q2-2026">Q2 2026</Select.Item>
            <Select.Item value="q4-2025">Q4 2025</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.key} align={col.align}>
                {col.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedResults.map((kr) => (
            <Table.Row key={kr.id} align="center">
              {columns.map((col) => {
                switch (col.key) {
                  case "title":
                    return (
                      <Table.RowHeaderCell key={col.key}>
                        <Flex align="center" gap="2">
                          <HiOutlineFlag size={14} color="var(--gray-9)" />
                          <Text size="2" color="gray" weight="medium">{kr.title}</Text>
                          <Badge>3 Todos</Badge>
                        </Flex>
                      </Table.RowHeaderCell>
                    );
                  case "objectiveTitle":
                    return (
                      <Table.Cell key={col.key}>
                        <Badge>{kr.objectiveTitle}</Badge>
                      </Table.Cell>
                    );
                  case "status":
                    return (
                      <Table.Cell key={col.key}>
                        <Badge color={getStatusColor(kr.status) as any}>{kr.status}</Badge>
                      </Table.Cell>
                    );
                  case "progress":
                    return (
                      <Table.Cell key={col.key}>
                        <Flex align="center" gap="2" maxWidth="200px">
                          <Progress value={kr.progress} size="2" style={{ width: "120px" }} />
                          <Text size="1" weight="medium">{kr.progress}%</Text>
                        </Flex>
                      </Table.Cell>
                    );
                  default:
                    return (
                      <Table.Cell key={col.key}>
                        <Text size="2">{String(kr[col.key] ?? "")}</Text>
                      </Table.Cell>
                    );
                }
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filteredResults.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
