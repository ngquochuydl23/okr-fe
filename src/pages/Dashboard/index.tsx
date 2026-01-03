import "./dashboard.scss";
import DashboardCard from "./components/DashboardCard";
import { TbTargetArrow } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import { FaRegFlag } from "react-icons/fa";
import CheckInChart from "./components/CheckInChart";
import OKRStackBar from "./components/OKRStackBar";
import OKRTreeView from "./components/OKRTreeView";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h4>Hi, Huy</h4>
      <div className="dashboard-statistic">
        <DashboardCard
          title="Objectives"
          value={12}
          icon={<TbTargetArrow />}
          subtitle="Active objectives"
          variant="primary"
          trend={{ value: 12.5, isPositive: true, label: "vs last month" }}
        />

        <DashboardCard
          title="Key Results"
          value={48}
          icon={<FaRegFlag />}
          subtitle="Active Key Results"
          variant="primary"
          trend={{ value: 12.5, isPositive: true, label: "vs last month" }}
        />

        <DashboardCard
          title="Completed"
          value={"77%"}
          icon={<SiTicktick />}
          subtitle="Overall Progress"
          variant="success"
          onClick={() => console.log("clicked")}
        />

        <DashboardCard
          title="Remaining time"
          value={"30 days"}
          icon={<SiTicktick />}
          subtitle="Overall Progress"
          variant="success"
          onClick={() => console.log("clicked")}
        />
      </div>
      <div className="dashboard-chart">
        <CheckInChart
          title="OKR Status Overview"
          data={{
            onTrack: 15,
            atRisk: 8,
            behind: 3,
          }}
          loading={false}
        />
        <OKRStackBar
          title="OKR Status Trends"
          data={[
            { week: "W1", onTrack: 6, atRisk: 5, behind: 3, unknown: 12 },
            { week: "W2", onTrack: 7, atRisk: 6, behind: 3, unknown: 10 },
            { week: "W3", onTrack: 8, atRisk: 6, behind: 3, unknown: 9 },
            { week: "W4", onTrack: 9, atRisk: 7, behind: 3, unknown: 7 },
            { week: "W5", onTrack: 11, atRisk: 6, behind: 3, unknown: 6 },
            { week: "W6", onTrack: 12, atRisk: 6, behind: 3, unknown: 5 },
            { week: "W7", onTrack: 13, atRisk: 6, behind: 2, unknown: 5 },
            { week: "W8", onTrack: 14, atRisk: 5, behind: 2, unknown: 5 },
            { week: "W9", onTrack: 15, atRisk: 5, behind: 2, unknown: 4 },
            { week: "W10", onTrack: 16, atRisk: 4, behind: 2, unknown: 4 },
            { week: "W11", onTrack: 17, atRisk: 4, behind: 2, unknown: 3 },
            { week: "W12", onTrack: 18, atRisk: 3, behind: 2, unknown: 3 },
            { week: "W13", onTrack: 19, atRisk: 3, behind: 1, unknown: 3 },
          ]}
          showPercentage={true}
        />
      </div>
      <OKRTreeView />
    </div>
  );
}
