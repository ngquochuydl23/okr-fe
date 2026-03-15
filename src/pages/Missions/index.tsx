import { useState } from "react";
import MissionCard from "@/components/missions/MissionCard";
import Pagination from "@/components/Pagination";
import { Badge, Button, Dialog, Flex, Grid, Heading, Select, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { TbFilter, TbPlus, TbSearch } from "react-icons/tb";

interface MissionFilters {
  status: string;
  cycle: string;
}

const Page = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const { control, handleSubmit, watch, reset } = useForm<MissionFilters>({
    defaultValues: {
      status: "all",
      cycle: "q1-2026",
    },
  });

  const handleApplyFilters = (data: MissionFilters) => {
    console.log("Applying filters:", data);
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    reset({
      status: "all",
      cycle: "q1-2026",
    });
    setFilterOpen(false);
  };

  const activeFiltersCount = Object.values(watch()).filter((val) => val !== "all" && val !== "q1-2026").length;

  const renderFilters = () => (
    <>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select.Root value={field.value} onValueChange={field.onChange}>
            <Select.Trigger variant="surface" placeholder="Status" />
            <Select.Content>
              <Select.Item value="all">All Status</Select.Item>
              <Select.Item value="on-track">On Track</Select.Item>
              <Select.Item value="at-risk">At Risk</Select.Item>
              <Select.Item value="behind">Behind</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />

      <Controller
        name="cycle"
        control={control}
        render={({ field }) => (
          <Select.Root value={field.value} onValueChange={field.onChange}>
            <Select.Trigger variant="surface" placeholder="Cycles" />
            <Select.Content>
              <Select.Item value="q1-2026">Q1 2026</Select.Item>
              <Select.Item value="q2-2026">Q2 2026</Select.Item>
              <Select.Item value="q4-2025">Q4 2025</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />
    </>
  );

  return (
    <div className="flex flex-col">
      <Flex
        justify="between"
        align="center"
        gap="3"
        mb="4"
        mt="4"
      >
        <Heading size="5">Missions</Heading>
        <Button size="2" onClick={() => { }}>
          <TbPlus size={16} /> New Mission
        </Button>
      </Flex>

      <Flex gap="3" align="center" wrap={{ initial: "nowrap", lg: "wrap" }} mb="4">
        <TextField.Root
          variant="surface"
          placeholder="Search objectives..."
          style={{ width: "100%", maxWidth: "300px", flex: 1, minWidth: 0 }}
        >
          <TextField.Slot>
            <TbSearch size="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex gap="3" align="center" display={{ initial: "none", lg: "flex" }}>
          {renderFilters()}
        </Flex>

        <Dialog.Root open={filterOpen} onOpenChange={setFilterOpen}>
          <Flex display={{ initial: "inline-flex", lg: "none" }} flexShrink="0">
            <Dialog.Trigger>
              <Button variant="soft">
                <TbFilter size={16} /> Filter
                {activeFiltersCount > 0 && (
                  <Badge variant="solid" radius="full" ml="2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </Dialog.Trigger>
          </Flex>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Filter Missions</Dialog.Title>
            <form onSubmit={handleSubmit(handleApplyFilters)}>
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
      </Flex>

      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="5" width="auto" mt="5">
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Improve Product Quality"
          description="Improve reliability, reduce bugs, and increase release confidence in our booking and maritime tracking modules."
          isCompleted={false}
          percentage={50} />
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Global Connectivity"
          description="Driving operational excellence through high-quality, reliable, and bug-free logistics platforms."
          isCompleted={true}
          percentage={100} />
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Global Connectivity"
          description="Driving operational excellence through high-quality, reliable, and bug-free logistics platforms."
          isCompleted={true}
          percentage={100} />
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Global Connectivity"
          description="Driving operational excellence through high-quality, reliable, and bug-free logistics platforms."
          isCompleted={true}
          percentage={100} />
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Global Connectivity"
          description="Driving operational excellence through high-quality, reliable, and bug-free logistics platforms."
          isCompleted={true}
          percentage={100} />
        <MissionCard
          id="a4456c4e-f968-4e72-b1ed-3cde05f27afe"
          name="Global Connectivity"
          description="Driving operational excellence through high-quality, reliable, and bug-free logistics platforms."
          isCompleted={true}
          percentage={100} />
      </Grid>
      <Pagination
        page={1}
        pageSize={10}
        total={100}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
      />
    </div>
  )
}

export default Page;