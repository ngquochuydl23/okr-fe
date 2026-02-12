import { Flex, Button, TextField, Select } from "@radix-ui/themes";
import { TbPlus, TbSearch } from "react-icons/tb";
import ObjectiveTable from "./components/ObjectiveTable";
import type { Objective } from "./components/ObjectiveTable";
import { ObjectiveType } from "@/constants/objective.constants";

export default function WorkspaceObjectives() {
  const mockObjectives: Objective[] = [
    {
      id: "1",
      title: "Optimize Global Vessel Turnaround & Port Stay Performance",
      description: "Minimize port idle time and enhance bunker efficiency through AI-driven schedule optimization.",
      progress: 75,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: {
        id: '95f3c5ff-4519-4ca7-a240-66787e4fc0b6',
        fullName: "Nguyễn Quốc Huy",
        avatar: 'https://instagram.fdad3-1.fna.fbcdn.net/v/t51.2885-19/448055440_429726770040591_3908603074599590037_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdad3-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QFxcnJRQhlLKUJ-ScebQ-IOBP7uTKvAL40n6nFNpRTUA-yMBufE3L6xmo9eoCCMcOk&_nc_ohc=DeBySvU8l_QQ7kNvwGZtHGG&_nc_gid=81feAfGZjypzPjjXbCdfrQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfuIjYU4a7zyvqRJGLO6sMtleqKPh5LX9PT3BuoE59BeHw&oe=69930FAF&_nc_sid=7a9f4b'
      },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-1-1", title: "Reduce average port turnaround time by 15%", progress: 80, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-1-2", title: "Achieve 95% schedule adherence across major routes", progress: 70, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-1-3", title: "Decrease bunker consumption per TEU-mile by 10%", progress: 65, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "2",
      title: "Accelerate End-to-End (E2E) Logistics Market Penetration",
      description: "Expand non-ocean logistics revenue by integrating cross-border warehousing and LCL services.",
      progress: 60,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: {
        id: '94981e16-5dfa-4b57-9af9-38c2d5097a6e',
        fullName: "Nguyễn Quốc Huy",
        avatar: 'https://instagram.fdad3-1.fna.fbcdn.net/v/t51.2885-19/448055440_429726770040591_3908603074599590037_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdad3-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QFKuGCRsCnk7K1ZDA7GMiN7vy7CjollhbMRg0m7wwP5JXYttdWpv0uo3HDD9BO8WMw&_nc_ohc=DeBySvU8l_QQ7kNvwGZtHGG&_nc_gid=vqwNM4-Vo9KPLHIjAdfI9A&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Afsznck49vNac80_44Mw5QlmFonbzT5VZ4s-5DJ3qze1OA&oe=69930FAF&_nc_sid=22de04'
      },
      dueDate: "Q2 2026",
      keyResults: [
        { id: "kr-2-1", title: "Onboard 50 new cross-border warehousing clients", progress: 55, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
        { id: "kr-2-2", title: "Increase LCL service revenue by 25%", progress: 60, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "3",
      title: "Lead Maritime Decarbonization via Green Methanol Adoption",
      description: "Retrofit existing fleet and secure renewable fuel supply chains to meet Net-Zero 2040 milestones.",
      progress: 45,
      status: "At Risk",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: {
        id: 'f923ed18-360d-4e40-82c7-9ba2a569fedd',
        fullName: "Nguyễn Quốc Huy",
        avatar: 'https://www.save-free.com/cdn/https://instagram.fvns1-5.fna.fbcdn.net/v/t51.2885-19/448055440_429726770040591_3908603074599590037_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fvns1-5.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QG0PAC9dWQzcmE_ciVG2br4AR7bvEUesZ4R3r4OBnM5riZ7coaC-Ja472Q_SmYSmWQ&_nc_ohc=DeBySvU8l_QQ7kNvwHILAEi&_nc_gid=u327IL3qnSwUFpsJxrtHPg&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_Afs-bBJOJiFkkuIZfr4knHAJsy1KJ4cmUYQJLoQ4kBDtsA&oe=69922EAF&_nc_sid=1e20d2'
      },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-3-1", title: "Retrofit 5 vessels to dual-fuel methanol engines", progress: 40, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-3-2", title: "Secure 3 green methanol supply agreements", progress: 50, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
  ];

  return (
    <div>
      <ObjectiveTable
        title="Workspace OKR"
        type={ObjectiveType.WORKSPACE}
        objectives={mockObjectives} />
    </div>
  );
}
