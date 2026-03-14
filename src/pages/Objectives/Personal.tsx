import { ObjectiveType } from "@/constants/objective.constants";
import ObjectiveTable from "./components/ObjectiveTable";
import type { Objective } from "./components/ObjectiveTable";

export default function PersonalObjectives() {
  const mockPersonalObjectives: Objective[] = [
    {
      id: "1",
      title: "Enhance Technical Skills",
      description: "Master new technologies and frameworks",
      progress: 80,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      createdAt: "2025-12-25",
      keyResults: [
        { id: "kr-1-1", title: "Complete 3 advanced React courses", progress: 90, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-1-2", title: "Build 2 side projects with new tech stack", progress: 70, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "2",
      title: "Improve Leadership Skills",
      description: "Develop mentoring and coaching abilities",
      progress: 55,
      status: "On Track",
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q2 2026",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      createdAt: "2026-03-01",
      keyResults: [
        { id: "kr-2-1", title: "Mentor 2 junior developers", progress: 60, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
        { id: "kr-2-2", title: "Lead 5 technical design reviews", progress: 50, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "3",
      title: "Complete Certification",
      description: "Obtain cloud architecture certification",
      progress: 40,
      status: "At Risk",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      createdAt: "2026-01-01",
      keyResults: [
        { id: "kr-3-1", title: "Pass AWS Solutions Architect exam", progress: 35, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-3-2", title: "Complete all practice labs", progress: 45, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
  ];

  return (
    <div>
      <ObjectiveTable
        title="Personal OKR"
        type={ObjectiveType.PERSONAL}
        objectives={mockPersonalObjectives}
        color="var(--green-9)"
      />
    </div>
  );
}
