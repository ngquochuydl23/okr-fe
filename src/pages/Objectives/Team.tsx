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
    {
      id: "4",
      title: "Optimize Cloud Infrastructure Costs",
      description: "Reduce unnecessary AWS spending without impacting performance",
      progress: 45,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Infrastructure" },
      owner: { id: "u2", fullName: "Le Minh Anh", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-4-1", title: "Terminate 100% of unused staging instances", progress: 80, status: "On Track", owner: "Le Minh Anh", dueDate: "Q1 2026" },
        { id: "kr-4-2", title: "Migrate 50% of workloads to Spot Instances", progress: 10, status: "Behind", owner: "Le Minh Anh", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "5",
      title: "Improve Platform Stability",
      description: "Minimize downtime and improve incident response times",
      progress: 20,
      status: "At Risk",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Infrastructure" },
      owner: { id: "u2", fullName: "Le Minh Anh", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-5-1", title: "Achieve 99.9% uptime for core services", progress: 25, status: "At Risk", owner: "Le Minh Anh", dueDate: "Q1 2026" },
        { id: "kr-5-2", title: "Reduce Mean Time to Recovery (MTTR) by 30%", progress: 15, status: "At Risk", owner: "Le Minh Anh", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "6",
      title: "Expand Market Reach in SEA",
      description: "Launch localized services for Vietnam and Thailand",
      progress: 10,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Market Expansion" },
      owner: { id: "u3", fullName: "Tran Hoang Nam", avatar: "" },
      dueDate: "Q2 2026",
      keyResults: [
        { id: "kr-6-1", title: "Complete localization for 5 core modules", progress: 15, status: "On Track", owner: "Tran Hoang Nam", dueDate: "Q2 2026" },
        { id: "kr-6-2", title: "Secure 3 local logistics partnerships", progress: 5, status: "On Track", owner: "Tran Hoang Nam", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "7",
      title: "Enhance Security Compliance",
      description: "Prepare for ISO 27001 certification audit",
      progress: 85,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Security Compliance" },
      owner: { id: "u4", fullName: "Pham Thi Hoa", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-7-1", title: "Complete internal security audit", progress: 100, status: "Completed", owner: "Pham Thi Hoa", dueDate: "Q1 2026" },
        { id: "kr-7-2", title: "Train 100% of staff on data privacy", progress: 70, status: "On Track", owner: "Pham Thi Hoa", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "8",
      title: "Boost Customer Retention",
      description: "Decrease churn rate by improving onboarding",
      progress: 40,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Customer Success" },
      owner: { id: "u5", fullName: "Vu Quang Huy", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-8-1", title: "Reduce churn rate from 8% to 5%", progress: 30, status: "On Track", owner: "Vu Quang Huy", dueDate: "Q1 2026" },
        { id: "kr-8-2", title: "Implement automated onboarding sequence", progress: 50, status: "On Track", owner: "Vu Quang Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "9",
      title: "Refactor Legacy API",
      description: "Replace deprecated endpoints with GraphQL",
      progress: 15,
      status: "Behind",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Container Tracker" },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q2 2026",
      keyResults: [
        { id: "kr-9-1", title: "Deprecate 20 V1 REST endpoints", progress: 10, status: "Behind", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
        { id: "kr-9-2", title: "Onboard 3 partner teams to GraphQL", progress: 20, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026" },
      ],
    },
    {
      id: "10",
      title: "Streamline Warehouse Operations",
      description: "Integrate IoT trackers for real-time inventory",
      progress: 55,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Logistics Ops" },
      owner: { id: "u6", fullName: "Doan Minh Khoi", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-10-1", title: "Install 500 IoT sensors in Main Hub", progress: 90, status: "On Track", owner: "Doan Minh Khoi", dueDate: "Q1 2026" },
        { id: "kr-10-2", title: "Reduce inventory scanning time by 50%", progress: 20, status: "Behind", owner: "Doan Minh Khoi", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "11",
      title: "Improve Frontend Performance",
      description: "Core Web Vitals improvement across all dashboards",
      progress: 75,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Container Tracker" },
      owner: { id: "u7", fullName: "Hoang Bao Ngoc", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-11-1", title: "Achieve LCP under 2.5s for main dashboard", progress: 80, status: "On Track", owner: "Hoang Bao Ngoc", dueDate: "Q1 2026" },
        { id: "kr-11-2", title: "Reduce bundle size by 30%", progress: 70, status: "On Track", owner: "Hoang Bao Ngoc", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "12",
      title: "Launch Mobile App Beta",
      description: "Release iOS and Android versions to internal testers",
      progress: 95,
      status: "On Track",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Export Control Team" },
      owner: { id: "u1", fullName: "Nguyen Quoc Huy", avatar: "" },
      dueDate: "Q1 2026",
      keyResults: [
        { id: "kr-12-1", title: "Fix all 'Blocker' severity bugs", progress: 100, status: "Completed", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
        { id: "kr-12-2", title: "Collect feedback from 50 internal users", progress: 90, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026" },
      ],
    },
    {
      id: "13",
      title: "AI Predictive Analytics",
      description: "Integrate ML model for vessel delay predictions",
      progress: 30,
      status: "At Risk",
      cycle: { id: '', name: 'Q1 2026' },
      team: { id: '', name: "Data Science" },
      owner: { id: "u8", fullName: "Ly Thanh Tung", avatar: "" },
      dueDate: "Q2 2026",
      keyResults: [
        { id: "kr-13-1", title: "Achieve 85% accuracy in delay predictions", progress: 40, status: "On Track", owner: "Ly Thanh Tung", dueDate: "Q2 2026" },
        { id: "kr-13-2", title: "Deploy model to production environment", progress: 20, status: "At Risk", owner: "Ly Thanh Tung", dueDate: "Q2 2026" },
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
