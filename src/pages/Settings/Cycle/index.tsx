import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, MixerHorizontalIcon, PlusIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { cycleService } from "@/services/cycleService";
import type { CycleDTO } from "@/types/cycle";
import { useForm } from "react-hook-form";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CycleManagement() {
  const [cycles, setCycles] = useState<CycleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingCycle, setEditingCycle] = useState<CycleDTO | null>(null);

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

  return (
    <Box p="4">
      <Flex
        justify="between"
        align="center"
        mb="4"
        py="4"
      >
        <Heading size="6">Cycle Management</Heading>
        <Flex gap="3">
          <TextField.Root placeholder="Search cycles...">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

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
                {/* Add filter fields here as needed */}
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
        </Flex>
      </Flex>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Updated</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="right"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={4}>Loading...</Table.Cell>
            </Table.Row>
          ) : cycles.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4}>No cycles found.</Table.Cell>
            </Table.Row>
          ) : (
            cycles.map((cycle) => (
              <Table.Row key={cycle.id}>
                <Table.RowHeaderCell>{cycle.name}</Table.RowHeaderCell>
                <Table.Cell>{cycle.description}</Table.Cell>
                <Table.Cell>
                  {new Date(cycle.lastUpdatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell align="right">
                  <Flex gap="1rem" justify="end">
                    <IconButton
                      variant="ghost"
                      color="gray"
                      onClick={() => handleEdit(cycle)}
                    >
                      <MdOutlineModeEditOutline size={20} />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      color="red"
                      onClick={() => handleDelete(cycle.id)}
                    >
                      <RiDeleteBin6Line size={20}/>
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
