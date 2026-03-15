import "./dashboard.scss";
import DashboardCard from "./components/DashboardCard";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegFlag } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import CheckInChart from "./components/CheckInChart";
import OKRStackBar from "./components/OKRStackBar";
import OKRTreeView from "./components/OKRTreeView";
import { FiAlertTriangle, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";

const metricCards = [
  {
    title: "Objectives",
    value: 12,
    icon: <TbTargetArrow />,
    subtitle: "Active objectives",
    variant: "primary" as const,
    trend: { value: 12.5, isPositive: true, label: "vs last month" },
  },
  {
    title: "Key Results",
    value: 48,
    icon: <FaRegFlag />,
    subtitle: "Active key results",
    variant: "primary" as const,
    trend: { value: 8.1, isPositive: true, label: "vs last month" },
  },
  {
    title: "Completed",
    value: "77%",
    icon: <SiTicktick />,
    subtitle: "Overall progress",
    variant: "success" as const,
  },
  {
    title: "Remaining Time",
    value: "30 days",
    icon: <FiClock />,
    subtitle: "Current cycle",
    variant: "success" as const,
  },
];

const focusItems = [
  {
    id: "at-risk",
    title: "3 OKRs need attention",
    description: "At risk this week. Assign owners and add unblockers.",
    icon: <FiAlertTriangle />,
    tone: "warning",
  },
  {
    id: "checkin",
    title: "14 check-ins pending",
    description: "Send reminder before Friday 6:00 PM to keep cadence.",
    icon: <FiCalendar />,
    tone: "info",
  },
  {
    id: "wins",
    title: "9 key results improved",
    description: "Momentum is strong in Product and Engineering teams.",
    icon: <FiCheckCircle />,
    tone: "success",
  },
] as const;

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero__content">
          <span className="dashboard-hero__eyebrow">Performance snapshot</span>
          <h4>Hi, Huy. Here is your OKR health overview.</h4>
          <p>
            Track delivery signals, detect risk early, and focus your next action in one view.
          </p>
        </div>
        <div className="dashboard-hero__meta">
          <div className="dashboard-chip dashboard-chip--primary">Q2 2026 cycle</div>
          <div className="dashboard-chip">Team cadence: Weekly</div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>Core metrics</h5>
          <p>High-level numbers from your current cycle.</p>
        </div>

        <div className="dashboard-statistic">
          {metricCards.map((item) => (
            <DashboardCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              subtitle={item.subtitle}
              variant={item.variant}
              trend={item.trend}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>Focus now</h5>
          <p>Recommended actions to keep OKRs on track.</p>
        </div>

        <div className="dashboard-focus-list">
          {focusItems.map((item) => (
            <article key={item.id} className={`dashboard-focus-card dashboard-focus-card--${item.tone}`}>
              <div className="dashboard-focus-card__icon">{item.icon}</div>
              <div className="dashboard-focus-card__body">
                <h6>{item.title}</h6>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>Status & trends</h5>
          <p>Distribution and weekly trend movement.</p>
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
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>OKR tree view</h5>
          <p>Explore dependencies and parent-child alignment.</p>
        </div>

        <OKRTreeView />
      </section>
    </div>
  );
}
