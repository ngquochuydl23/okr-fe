import "./dashboard.scss";
import DashboardCard from "./components/DashboardCard";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegFlag } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import CheckInChart from "./components/CheckInChart";
import OKRStackBar from "./components/OKRStackBar";
import OKRTreeView from "./components/OKRTreeView";
import { FiAlertTriangle, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";

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
    title: "N_OKRS_NEED_ATTENTION",
    description: "ATTENTION_DESCRIPTION",
    icon: <FiAlertTriangle />,
    tone: "warning",
  },
  {
    id: "checkin",
    title: "N_CHECKINS_PENDING",
    description: "CHECKINS_PENDING_DESCRIPTION",
    icon: <FiCalendar />,
    tone: "info",
  },
  {
    id: "wins",
    title: "N_KEYRESULTS_IMPROVED",
    description: "KEYRESULTS_IMPROVED_DESCRIPTION",
    icon: <FiCheckCircle />,
    tone: "success",
  },
] as const;

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero__content">
          <span className="dashboard-hero__eyebrow">{t("MODULES.DASHBOARD.PERFORMANCE_SNAPSHOT")}</span>
          <h4>{t("MODULES.DASHBOARD.SAY_HELLO", { name: user?.fullName })}</h4>
          <p>{t("MODULES.DASHBOARD.DESCRIPTION")}</p>
        </div>
        <div className="dashboard-hero__meta">
          <div className="dashboard-chip dashboard-chip--primary">{t("MODULES.DASHBOARD.CURRENT_CYCLE_NAME", { cycleName: "Q2 2026" })}</div>
          <div className="dashboard-chip">Team cadence: Weekly</div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>{t("MODULES.DASHBOARD.CORE_METRICS")}</h5>
          <p>{t("MODULES.DASHBOARD.CORE_METRICS_DESCRIPTION")}</p>
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
          <h5>{t("MODULES.DASHBOARD.FOCUS_AREA.FOCUS_NOW")}</h5>
          <p>{t("MODULES.DASHBOARD.FOCUS_AREA.DESCRIPTION")}</p>
        </div>

        <div className="dashboard-focus-list">
          {focusItems.map((item) => (
            <article key={item.id} className={`dashboard-focus-card dashboard-focus-card--${item.tone}`}>
              <div className="dashboard-focus-card__icon">{item.icon}</div>
              <div className="dashboard-focus-card__body">
                <h6>{t(item.title, { count: 3 })}</h6>
                <p>{t(item.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h5>{t("MODULES.DASHBOARD.STATUS_AND_TREND.TITLE")}</h5>
          <p>{t("MODULES.DASHBOARD.STATUS_AND_TREND.DESCRIPTION")}</p>
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
