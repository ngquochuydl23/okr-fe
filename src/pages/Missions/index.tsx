import MissionCard from "@/components/missions/MissionCard";
import Pagination from "@/components/Pagination";
import { Button, Flex, Grid, Heading, Select, TextField } from "@radix-ui/themes";
import { TbPlus, TbSearch } from "react-icons/tb";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Heading size="5">Missions</Heading>
      <Flex justify="between" align="center" mb="4" mt="4">
        <Flex gap="3" align="center">
          <TextField.Root
            variant="surface"
            placeholder="Search objectives..."
            style={{ width: "300px" }}

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
        </Flex>
        <Button size="2" onClick={() => { }}>
          <TbPlus size={16} /> New Mission
        </Button>
      </Flex>
      <Grid columns="3" gap="5" width="auto" mt="5">
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