import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { cycleService } from "@/services/cycleService";
import type { CycleDTO } from "@/types/cycle";
import { useForm } from "react-hook-form";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCalendarEvent, TbClockHour4, TbRefresh } from "react-icons/tb";
import "./cycle.scss";

export default function CycleManagement() {
  const [cycles, setCycles] = useState<CycleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingCycle, setEditingCycle] = useState<CycleDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, setValue } = useForm<{
    name: string;
    description: string;
  }>();

  useEffect(() => {
    loadCycles();
  }, []);

  const loadCycles = async () => {
    setLoading(true);
    try {
      const data = await cycleService.getAll();
      setCycles(data);
    } catch (error) {
      console.error("Failed to load cycles", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      if (editingCycle) {
        await cycleService.update(editingCycle.id, data);
      } else {
        await cycleService.create(data);
      }
      loadCycles();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save cycle", error);
    }
  };

  const handleEdit = (cycle: CycleDTO) => {
    setEditingCycle(cycle);
    setValue("name", cycle.name);
    setValue("description", cycle.description);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this cycle?")) {
      try {
        await cycleService.delete(id);
        loadCycles();
      } catch (error) {
        console.error("Failed to delete cycle", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCycle(null);
    reset();
  };

  const now = Date.now();

  const toTime = (value?: string) => {
    if (!value) {
      return null;
    }

    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? null : parsed;
  };

  const visibleCycles = cycles.filter((cycle) => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return (
      cycle.name.toLowerCase().includes(keyword) ||
      cycle.description.toLowerCase().includes(keyword)
    );
  });

  const pastCyclesCount = cycles.filter((cycle) => {
    const endTime = toTime(cycle.endDate);
    return endTime !== null && endTime < now;
  }).length;

  const incomingCyclesCount = cycles.filter((cycle) => {
    const startTime = toTime(cycle.startDate);
    return startTime !== null && startTime > now;
  }).length;

  return (
    <Box className="cycle-management">
      <section className="cycle-management__hero">
        <div className="cycle-management__hero-copy">
          <span className="cycle-management__eyebrow">Workspace Settings</span>
          <Heading size="7">Cycle Management</Heading>
          <Text size="2" color="gray" className="cycle-management__subtitle">
            Organize planning periods, monitor update rhythm, and keep your objective timelines aligned.
          </Text>
        </div>
      </section>

      <div className="cycle-management__stats" role="list" aria-label="Cycle statistics">
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbCalendarEvent size={18} /></span>
          <div>
            <Text size="1" color="gray">Total Cycles</Text>
            <Heading size="6">{cycles.length}</Heading>
          </div>
        </div>
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbClockHour4 size={18} /></span>
          <div>
            <Text size="1" color="gray">Past Cycles</Text>
            <Heading size="6">{pastCyclesCount}</Heading>
          </div>
        </div>
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbRefresh size={18} /></span>
          <div>
            <Text size="1" color="gray">Incoming Cycles</Text>
            <Heading size="6">{incomingCyclesCount}</Heading>
          </div>
        </div>
      </div>

      <div className="cycle-table">
        <Flex justify="between" align="center" mb="4">
          <Heading size="5">Cycles</Heading>
        </Flex>

        <div className="cycle-table__toolbar">
          <div className="cycle-table__filters">
            <TextField.Root
              className="cycle-table__search"
              variant="surface"
              placeholder="Search cycles..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <div className="cycle-table__desktop-filters">
              <div className="cycle-table__filters-form">
                <Dialog.Root
                  open={isFilterDialogOpen}
                  onOpenChange={setIsFilterDialogOpen}
                >
                  <Dialog.Trigger>
                    <Button variant="soft" color="gray">
                      <MixerHorizontalIcon /> Filter
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Filter Cycles</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Filter cycles by status or date range.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                      <Text size="2" color="gray">No filters available yet.</Text>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button
                          variant="soft"
                          color="gray"
                          onClick={() => setIsFilterDialogOpen(false)}
                        >
                          Close
                        </Button>
                      </Dialog.Close>
                      <Button onClick={() => setIsFilterDialogOpen(false)}>
                        Apply
                      </Button>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>

                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Trigger>
                    <Button
                      onClick={() => {
                        setEditingCycle(null);
                        reset();
                      }}
                    >
                      <PlusIcon /> Add Cycle
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>
                      {editingCycle ? "Edit Cycle" : "Create Cycle"}
                    </Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      {editingCycle
                        ? "Update the cycle details."
                        : "Add a new cycle to the workspace."}
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Flex direction="column" gap="3">
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Name
                          </Text>
                          <TextField.Root
                            placeholder="e.g. Q1 2024"
                            {...register("name", { required: true })}
                          />
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Description
                          </Text>
                          <TextField.Root
                            placeholder="Description of the cycle"
                            {...register("description")}
                          />
                        </label>
                      </Flex>

                      <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                          <Button variant="soft" color="gray" onClick={handleCloseDialog} type="button">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Button type="submit">Save</Button>
                      </Flex>
                    </form>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>

            <div className="cycle-table__mobile-filter-btn">
              <Dialog.Root
                open={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
              >
                <Dialog.Trigger>
                  <Button variant="soft" color="gray" className="cycle-table__mobile-action-btn">
                    <MixerHorizontalIcon /> Filter
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="450px">
                  <Dialog.Title>Filter Cycles</Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                    Filter cycles by status or date range.
                  </Dialog.Description>

                  <Flex direction="column" gap="3">
                    <Text size="2" color="gray">No filters available yet.</Text>
                  </Flex>

                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button
                        variant="soft"
                        color="gray"
                        onClick={() => setIsFilterDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </Dialog.Close>
                    <Button onClick={() => setIsFilterDialogOpen(false)}>
                      Apply
                    </Button>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </div>

            <div className="cycle-table__mobile-add-btn">
              <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Trigger>
                  <Button
                    className="cycle-table__mobile-add-action-btn"
                    onClick={() => {
                      setEditingCycle(null);
                      reset();
                    }}
                  >
                    <PlusIcon /> Add Cycle
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                  <Dialog.Title>
                    {editingCycle ? "Edit Cycle" : "Create Cycle"}
                  </Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                    {editingCycle
                      ? "Update the cycle details."
                      : "Add a new cycle to the workspace."}
                  </Dialog.Description>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="3">
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Name
                        </Text>
                        <TextField.Root
                          placeholder="e.g. Q1 2024"
                          {...register("name", { required: true })}
                        />
                      </label>
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Description
                        </Text>
                        <TextField.Root
                          placeholder="Description of the cycle"
                          {...register("description")}
                        />
                      </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray" onClick={handleCloseDialog} type="button">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button type="submit">Save</Button>
                    </Flex>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        </div>

        <div className="cycle-table__desktop">
          <div className="cycle-table__table-wrapper">
            <Table.Root variant="ghost">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className="cycle-table__col-name">Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="cycle-table__col-description">Description</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="cycle-table__col-last-updated">Last Updated</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right" className="cycle-table__col-actions"></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {loading ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>Loading cycles...</Table.Cell>
                  </Table.Row>
                ) : visibleCycles.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>
                      {searchTerm ? "No cycles match this search." : "No cycles found."}
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  visibleCycles.map((cycle) => (
                    <Table.Row key={cycle.id}>
                      <Table.RowHeaderCell className="cycle-table__col-name">{cycle.name}</Table.RowHeaderCell>
                      <Table.Cell className="cycle-table__col-description">{cycle.description}</Table.Cell>
                      <Table.Cell className="cycle-table__col-last-updated">
                        {new Date(cycle.lastUpdatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell align="right" className="cycle-table__col-actions">
                        <Flex gap="1rem" justify="end">
                          <IconButton
                            variant="ghost"
                            color="gray"
                            onClick={() => handleEdit(cycle)}
                            aria-label={`Edit ${cycle.name}`}
                          >
                            <MdOutlineModeEditOutline size={20} />
                          </IconButton>
                          <IconButton
                            variant="ghost"
                            color="red"
                            onClick={() => handleDelete(cycle.id)}
                            aria-label={`Delete ${cycle.name}`}
                          >
                            <RiDeleteBin6Line size={20} />
                          </IconButton>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </div>
        </div>

        <div className="cycle-table__mobile-list">
          {loading ? (
            <div className="cycle-table__empty-state">Loading cycles...</div>
          ) : visibleCycles.length === 0 ? (
            <div className="cycle-table__empty-state">
              {searchTerm ? "No cycles match this search." : "No cycles found."}
            </div>
          ) : (
            visibleCycles.map((cycle) => (
              <article key={cycle.id} className="cycle-table__card">
                <div className="cycle-table__card-head">
                  <Heading size="4">{cycle.name}</Heading>
                  <Flex gap="1">
                    <IconButton
                      variant="ghost"
                      color="gray"
                      onClick={() => handleEdit(cycle)}
                      aria-label={`Edit ${cycle.name}`}
                    >
                      <MdOutlineModeEditOutline size={18} />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      color="red"
                      onClick={() => handleDelete(cycle.id)}
                      aria-label={`Delete ${cycle.name}`}
                    >
                      <RiDeleteBin6Line size={18} />
                    </IconButton>
                  </Flex>
                </div>

                <Text size="2" color="gray" className="cycle-table__card-description">
                  {cycle.description}
                </Text>

                <div className="cycle-table__card-meta">
                  <Text size="1" color="gray">Last Updated</Text>
                  <Text size="2" weight="medium">
                    {new Date(cycle.lastUpdatedAt).toLocaleDateString()}
                  </Text>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </Box>
  );
}
