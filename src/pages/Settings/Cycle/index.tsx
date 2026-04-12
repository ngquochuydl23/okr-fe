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
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { cycleService } from "@/services/cycleService";
import type { CycleDTO } from "@/types/cycle";
import { useForm } from "react-hook-form";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCalendarEvent, TbClockHour4, TbRefresh } from "react-icons/tb";
import DatePicker from "@/components/DatePicker";
import { parse, isValid } from "date-fns";
import CycleFilterDialog from "./CycleFilterDialog";
import "./cycle.scss";
import { useTranslation } from "react-i18next";

type CycleFormValues = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export default function CycleManagement() {
  const [cycles, setCycles] = useState<CycleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingCycle, setEditingCycle] = useState<CycleDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { register, handleSubmit, reset, setValue, watch } = useForm<CycleFormValues>({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

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

  const toIsoDate = (value: string, boundary: "start" | "end") => {
    if (!value) {
      return undefined;
    }

    return boundary === "start"
      ? `${value}T00:00:00.000Z`
      : `${value}T23:59:59.999Z`;
  };

  const toDateInputValue = (value?: string) => {
    if (!value) {
      return "";
    }

    return value.slice(0, 10);
  };

  const onSubmit = async (data: CycleFormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
      startDate: toIsoDate(data.startDate, "start"),
      endDate: toIsoDate(data.endDate, "end"),
    };

    try {
      if (editingCycle) {
        await cycleService.update(editingCycle.id, payload);
      } else {
        await cycleService.create(payload);
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
    setValue("startDate", toDateInputValue(cycle.startDate));
    setValue("endDate", toDateInputValue(cycle.endDate));
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

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <Box className="cycle-management">
      <section className="cycle-management__hero">
        <div className="cycle-management__hero-copy">
          <span className="cycle-management__eyebrow">{t("MODULES.SETTINGS.WORKSPACE_SETTINGS")}</span>
          <Heading size="7">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.TITLE")}</Heading>
          <Text size="2" color="gray" className="cycle-management__subtitle">
            {t("MODULES.SETTINGS.CYCLE_MANAGEMENT.DESCRIPTION")}
          </Text>
        </div>
      </section>
      <div className="cycle-management__stats" role="list" aria-label="Cycle statistics">
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbCalendarEvent size={18} /></span>
          <div>
            <Text size="1" color="gray">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.TOTAL_CYCLES")}</Text>
            <Heading size="6">{cycles.length}</Heading>
          </div>
        </div>
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbClockHour4 size={18} /></span>
          <div>
            <Text size="1" color="gray">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.PAST_CYCLES")}</Text>
            <Heading size="6">{pastCyclesCount}</Heading>
          </div>
        </div>
        <div className="cycle-management__stat-card" role="listitem">
          <span className="cycle-management__stat-icon"><TbRefresh size={18} /></span>
          <div>
            <Text size="1" color="gray">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.INCOMING_CYCLES")}</Text>
            <Heading size="6">{incomingCyclesCount}</Heading>
          </div>
        </div>
      </div>

      <div className="cycle-table">
        <Flex justify="between" align="center" mb="4">
          <Heading size="5">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.CYCLES_LIST")}</Heading>
        </Flex>

        <div className="cycle-table__toolbar">
          <div className="cycle-table__filters">
            <TextField.Root
              className="cycle-table__search"
              variant="surface"
              placeholder={t("MODULES.SETTINGS.CYCLE_MANAGEMENT.SEARCH_PLACEHOLDER")}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <div className="cycle-table__desktop-filters">
              <div className="cycle-table__filters-form">
                <Button variant="soft" color="gray" onClick={() => setIsFilterDialogOpen(true)}>
                  <MixerHorizontalIcon /> {t("COMMON.BUTTON.FILTER")}
                </Button>
                <CycleFilterDialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} />
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Trigger>
                    <Button
                      onClick={() => {
                        setEditingCycle(null);
                        reset();
                      }}
                    >
                      <PlusIcon /> {t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_CYCLE_BUTTON")}
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>
                      {editingCycle
                        ? t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.EDIT_CYCLE_TITLE")
                        : t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.CREATE_CYCLE_TITLE")
                      }
                    </Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      {editingCycle
                        ? t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.EDIT_CYCLE_DESCRIPTION")
                        : t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.CREATE_CYCLE_DESCRIPTION")
                      }
                    </Dialog.Description>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Flex direction="column" gap="3">
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.NAME_LABEL")}</Text>
                          <TextField.Root
                            placeholder="e.g. Q1 2024"
                            {...register("name", { required: true })}
                          />
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.DESCRIPTION_LABEL")}</Text>
                          <TextArea
                            placeholder={t("MODULES.SETTINGS.CYCLE_MANAGEMENT.ADD_EDIT_CYCLE_DIALOG.DESCRIPTION_PLACEHOLDER")}
                            rows={4}
                            {...register("description")}
                          />
                        </label>
                        <Flex gap="3" className="cycle-date-row">
                          <div className="cycle-date-row__field">
                            <Text as="div" size="2" mb="1" weight="bold">Start date</Text>
                            <DatePicker
                              value={startDate}
                              onChange={(v) => setValue("startDate", v)}
                              placeholder="Pick start date"
                            />
                          </div>
                          <div className="cycle-date-row__field">
                            <Text as="div" size="2" mb="1" weight="bold">End date</Text>
                            <DatePicker
                              value={endDate}
                              onChange={(v) => setValue("endDate", v)}
                              placeholder="Pick end date"
                              fromDate={startDate && isValid(parse(startDate, "yyyy-MM-dd", new Date())) ? parse(startDate, "yyyy-MM-dd", new Date()) : undefined}
                            />
                          </div>
                        </Flex>
                      </Flex>
                      <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                          <Button variant="soft" color="gray" onClick={handleCloseDialog} type="button">{t("COMMON.BUTTON.CANCEL")}</Button>
                        </Dialog.Close>
                        <Button type="submit">{t("COMMON.BUTTON.SAVE")}</Button>
                      </Flex>
                    </form>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>

            <div className="cycle-table__mobile-filter-btn">
              <Button variant="soft" color="gray" onClick={() => setIsFilterDialogOpen(true)}>
                <MixerHorizontalIcon /> {t("COMMON.BUTTON.FILTER")}
              </Button>
            </div>

          </div>
        </div>
        <div className="cycle-table__desktop">
          <div className="cycle-table__table-wrapper">
            <Table.Root variant="ghost">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className="cycle-table__col-name">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.COLUMNS.NAME")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="cycle-table__col-description">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.COLUMNS.DESCRIPTION")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="cycle-table__col-last-updated">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.COLUMNS.LAST_UPDATED")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right" className="cycle-table__col-actions">{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.COLUMNS.ACTIONS")}</Table.ColumnHeaderCell>
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
