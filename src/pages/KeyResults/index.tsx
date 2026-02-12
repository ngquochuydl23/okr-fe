import KeyResultTable from './components/KeyResultTable'
import type { KeyResultItem } from './components/KeyResultTable'

const mockKeyResults: KeyResultItem[] = [
  { id: "kr-1-1", title: "Reduce average task cycle time by 20%", progress: 70, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026", objectiveTitle: "Improve Team Productivity" },
  { id: "kr-1-2", title: "Automate 5 recurring manual workflows", progress: 60, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026", objectiveTitle: "Improve Team Productivity" },
  { id: "kr-2-1", title: "Launch shared knowledge base with 100+ articles", progress: 55, status: "On Track", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026", objectiveTitle: "Enhance Collaboration" },
  { id: "kr-3-1", title: "Cut release cycle from 4 weeks to 2 weeks", progress: 30, status: "At Risk", owner: "Nguyen Quoc Huy", dueDate: "Q1 2026", objectiveTitle: "Accelerate Delivery" },
  { id: "kr-4-1", title: "Terminate 100% of unused staging instances", progress: 80, status: "On Track", owner: "Le Minh Anh", dueDate: "Q1 2026", objectiveTitle: "Optimize Cloud Infrastructure Costs" },
  { id: "kr-5-1", title: "Achieve 99.9% uptime for core services", progress: 25, status: "At Risk", owner: "Le Minh Anh", dueDate: "Q1 2026", objectiveTitle: "Improve Platform Stability" },
  { id: "kr-7-1", title: "Complete internal security audit", progress: 100, status: "Completed", owner: "Pham Thi Hoa", dueDate: "Q1 2026", objectiveTitle: "Enhance Security Compliance" },
  { id: "kr-8-1", title: "Reduce churn rate from 8% to 5%", progress: 30, status: "On Track", owner: "Vu Quang Huy", dueDate: "Q1 2026", objectiveTitle: "Boost Customer Retention" },
  { id: "kr-9-1", title: "Deprecate 20 V1 REST endpoints", progress: 10, status: "Behind", owner: "Nguyen Quoc Huy", dueDate: "Q2 2026", objectiveTitle: "Refactor Legacy API" },
  { id: "kr-10-1", title: "Install 500 IoT sensors in Main Hub", progress: 90, status: "On Track", owner: "Doan Minh Khoi", dueDate: "Q1 2026", objectiveTitle: "Streamline Warehouse Operations" },
  { id: "kr-11-1", title: "Achieve LCP under 2.5s for main dashboard", progress: 80, status: "On Track", owner: "Hoang Bao Ngoc", dueDate: "Q1 2026", objectiveTitle: "Improve Frontend Performance" },
  { id: "kr-13-1", title: "Achieve 85% accuracy in delay predictions", progress: 40, status: "On Track", owner: "Ly Thanh Tung", dueDate: "Q2 2026", objectiveTitle: "AI Predictive Analytics" },
];

export default function KeyResults() {
  return (
    <div>
      <KeyResultTable
        title="Key Results"
        keyResults={mockKeyResults}
      />
    </div>
  )
}
