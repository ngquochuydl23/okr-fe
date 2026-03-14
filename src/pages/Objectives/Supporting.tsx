import { ObjectiveType } from "@/constants/objective.constants";
import ObjectiveTable from "./components/ObjectiveTable";
import type { Objective } from "./components/ObjectiveTable";

export default function SupportingObjectives() {
  const mockSupportingObjectives: Objective[] = [
    {
      id: "1",
      title: "Support Infrastructure Upgrade",
      description: "Assist in migrating legacy systems to cloud",
      progress: 70,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      createdAt: "2026-01-01",
      keyResults: [
        { id: "kr-1-1", title: "Migrate 3 legacy services to cloud", progress: 80, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-1-2", title: "Achieve 99.9% uptime on migrated services", progress: 60, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "2",
      title: "Documentation Enhancement",
      description: "Create comprehensive API documentation",
      progress: 45,
      status: "On Track",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q2 2026",
      createdAt: "2026-03-01",
      keyResults: [
        { id: "kr-2-1", title: "Document 100% of public API endpoints", progress: 50, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
        { id: "kr-2-2", title: "Publish interactive API playground", progress: 40, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "3",
      title: "Quality Assurance Process",
      description: "Establish automated testing framework",
      progress: 30,
      status: "At Risk",
      cycle: {
        id: '',
        name: 'Q1 2026'
      },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      createdAt: "2026-06-01",
      keyResults: [
        { id: "kr-3-1", title: "Achieve 80% code coverage on critical paths", progress: 25, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-3-2", title: "Set up CI/CD pipeline with automated tests", progress: 35, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
  ];

  return (
    <div>
      <ObjectiveTable
        title="Supporting OKR"
        type={ObjectiveType.SUPPORTING}
        objectives={mockSupportingObjectives}
        color="var(--orange-9)"
      />
    </div>
  );
}
