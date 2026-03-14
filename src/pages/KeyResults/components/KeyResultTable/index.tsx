import { useState } from "react";
import { Text, Flex, Badge, Table, Progress, Heading, TextField, Select, Button, Dialog, Grid } from "@radix-ui/themes";
import { TbSearch, TbFilter } from "react-icons/tb";
import { HiOutlineFlag } from "react-icons/hi";
import Pagination from "@/components/Pagination";
import { DEFAULT_KEY_RESULT_COLUMNS, type KeyResultTableColumn } from "./key-result-table.config";
import "./key-result-table.scss";

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
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [cycleFilter, setCycleFilter] = useState<string | null>(null);

  const filteredResults = keyResults.filter((kr) => {
    const matchesSearch = kr.title.toLowerCase().includes(searchTerm.toLowerCase());
    // Add basic filtering logic if needed, or just keep search for now as original code only had search
    return matchesSearch;
  });

  const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleClearFilters = () => {
    setStatusFilter(null);
    setCycleFilter(null);
    setFilterOpen(false);
  };

  const handleApplyFilters = () => {
    setFilterOpen(false);
  };

  const activeFiltersCount = [statusFilter, cycleFilter].filter(val => val !== null && val !== 'all').length;

  const renderFilters = () => (
    <>
      <Select.Root value={statusFilter || undefined} onValueChange={setStatusFilter}>
        <Select.Trigger variant="surface" placeholder="Status" />
        <Select.Content>
          <Select.Item value="all">All Status</Select.Item>
          <Select.Item value="on-track">On Track</Select.Item>
          <Select.Item value="at-risk">At Risk</Select.Item>
          <Select.Item value="behind">Behind</Select.Item>
        </Select.Content>
      </Select.Root>
      <Select.Root value={cycleFilter || undefined} onValueChange={setCycleFilter}>
        <Select.Trigger variant="surface" placeholder="Cycles" />
        <Select.Content>
          <Select.Item value="q1-2026">Q1 2026</Select.Item>
          <Select.Item value="q2-2026">Q2 2026</Select.Item>
          <Select.Item value="q4-2025">Q4 2025</Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );

  return (
    <div className="key-result-table">
      <Heading size="5" mb="4">{title}</Heading>

      <div className="key-result-table__toolbar">
        <div className="key-result-table__filters">
          <TextField.Root
            className="key-result-table__search"
            variant="surface"
            placeholder="Search key results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <TextField.Slot>
              <TbSearch size="16" />
            </TextField.Slot>
          </TextField.Root>

          <div className="key-result-table__desktop-filters">
            <form className="key-result-table__filters-form">
              {renderFilters()}
            </form>
          </div>

          <div className="key-result-table__mobile-filter-btn">
            <Dialog.Root open={filterOpen} onOpenChange={setFilterOpen}>
              <Dialog.Trigger>
                <Button variant="soft" style={{ width: '100%' }}>
                  <TbFilter size={16} /> Filter
                  {activeFiltersCount > 0 && <Badge variant="solid" radius="full" style={{ marginLeft: '8px' }}>{activeFiltersCount}</Badge>}
                </Button>
              </Dialog.Trigger>
              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Filter Key Results</Dialog.Title>
                <form onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }}>
                  <Grid columns="2" gap="3" mt="4">
                    {renderFilters()}
                  </Grid>
                  <Flex mt="4" justify="between">
                    <Button variant="outline" color="gray" onClick={handleClearFilters} type="button">
                      Clear All
                    </Button>
                    <Flex gap="3">
                      <Dialog.Close>
                        <Button variant="soft" color="gray" type="button">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button type="submit">Apply Filters</Button>
                    </Flex>
                  </Flex>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>

      <div className="key-result-table__table-wrapper">
        <Table.Root variant="ghost">
          <Table.Header>
            <Table.Row>
              {columns.map((col) => (
                <Table.ColumnHeaderCell
                  key={col.key}
                  align={col.align}
                  className={`key-result-table__col-${col.key}`}
                >
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
                        <Table.RowHeaderCell key={col.key} className={`key-result-table__col-${col.key}`}>
                          <Flex align="center" gap="2">
                            <HiOutlineFlag size={14} color="var(--gray-9)" />
                            <Text size="2" color="gray" weight="medium" className="key-result-table__title-text">{kr.title}</Text>
                            <Badge>3 Todos</Badge>
                          </Flex>
                        </Table.RowHeaderCell>
                      );
                    case "objectiveTitle":
                      return (
                        <Table.Cell key={col.key} className={`key-result-table__col-${col.key}`}>
                          <Badge>{kr.objectiveTitle}</Badge>
                        </Table.Cell>
                      );
                    case "status":
                      return (
                        <Table.Cell key={col.key} className={`key-result-table__col-${col.key}`}>
                          <Badge color={getStatusColor(kr.status) as any}>{kr.status}</Badge>
                        </Table.Cell>
                      );
                    case "progress":
                      return (
                        <Table.Cell key={col.key} className={`key-result-table__col-${col.key}`}>
                          <Flex align="center" gap="2" maxWidth="200px">
                            <Progress value={kr.progress} size="2" style={{ width: "120px" }} />
                            <Text size="1" weight="medium">{kr.progress}%</Text>
                          </Flex>
                        </Table.Cell>
                      );
                    default:
                      return (
                        <Table.Cell key={col.key} className={`key-result-table__col-${col.key}`}>
                          <Text size="2">{String(kr[col.key] ?? "")}</Text>
                        </Table.Cell>
                      );
                  }
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

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
