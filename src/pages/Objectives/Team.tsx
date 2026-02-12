import { ObjectiveType } from "@/constants/objective.constants";
import ObjectiveTable from "./components/ObjectiveTable";
import type { Objective } from "./components/ObjectiveTable";
import { DEFAULT_COLUMNS } from "./components/ObjectiveTable/objective-table.config";

export default function TeamObjectives() {
  const mockTeamObjectives: Objective[] = [
    {
      id: "1",
      title: "Improve Team Productivity",
      description: "Streamline workflows and reduce bottlenecks",
      progress: 65,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      team: {
        id: '',
        name: "Container Tracker",
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-1-1", title: "Reduce average task cycle time by 20%", progress: 70, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-1-2", title: "Automate 5 recurring manual workflows", progress: 60, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "2",
      title: "Enhance Collaboration",
      description: "Foster better cross-functional communication",
      progress: 50,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      team: {
        id: '',
        name: "Export Control Team",
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q2 2026",
      keyResults: [
        { id: "kr-2-1", title: "Launch shared knowledge base with 100+ articles", progress: 55, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
        { id: "kr-2-2", title: "Conduct 10 cross-team workshops", progress: 45, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "3",
      title: "Accelerate Delivery",
      description: "Reduce time-to-market for new features",
      progress: 35,
      status: "At Risk",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      team: {
        id: '',
        name: "Export Control Team",
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-3-1", title: "Cut release cycle from 4 weeks to 2 weeks", progress: 30, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-3-2", title: "Achieve 90% CI/CD pipeline success rate", progress: 40, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
  ];

  return (
    <div>
      <ObjectiveTable
        title="Team OKR"
        type={ObjectiveType.TEAM}
        columns={[
          { key: "title", label: "Objective & Key results" },
          { key: "status", label: "Status" },
          { key: "progress", label: "Progress" },
          { key: "team", label: "Team" },
          { key: "owner", label: "Owner" },
          { key: "dueDate", label: "Due Date" }
        ]}
        objectives={mockTeamObjectives}
        color="var(--purple-9)"
      />
    </div>
  );
}
