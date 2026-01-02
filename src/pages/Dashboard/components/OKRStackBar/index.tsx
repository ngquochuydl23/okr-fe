import { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import clsx from "clsx";
import "./okr-stack-bar.scss";
import { IconButton } from "@radix-ui/themes";
import { FaWandMagicSparkles } from "react-icons/fa6";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export interface WeeklyOKRData {
  week: string; // e.g., "Week 1", "Jan 6"
  onTrack: number;
  atRisk: number;
  behind: number;
  unknown: number;
}

export interface OKRStackBarProps {
  title?: string;
  data?: WeeklyOKRData[];
  loading?: boolean;
  className?: string;
  showPercentage?: boolean; // true for 100% stacked, false for count
}

const OKRStackBar = memo<OKRStackBarProps>(
  ({
    title = "OKR Status Trends",
    data = [],
    loading = false,
    className,
    showPercentage = true,
  }) => {
    // Prepare data for Chart.js
    const labels = data.map((d) => d.week);
    const onTrackData = data.map((d) => d.onTrack);
    const atRiskData = data.map((d) => d.atRisk);
    const behindData = data.map((d) => d.behind);
    const unknownData = data.map((d) => d.unknown);

    // Calculate percentages if needed
    const totals = data.map((d) => d.onTrack + d.atRisk + d.behind + d.unknown);
    const onTrackPercentages = data.map((d, i) =>
      totals[i] > 0 ? (d.onTrack / totals[i]) * 100 : 0
    );
    const atRiskPercentages = data.map((d, i) =>
      totals[i] > 0 ? (d.atRisk / totals[i]) * 100 : 0
    );
    const behindPercentages = data.map((d, i) =>
      totals[i] > 0 ? (d.behind / totals[i]) * 100 : 0
    );
    const unknownPercentages = data.map((d, i) =>
      totals[i] > 0 ? (d.unknown / totals[i]) * 100 : 0
    );

    const chartConfig = {
      labels,
      datasets: [
        {
          label: "Behind",
          data: showPercentage ? behindPercentages : behindData,
          backgroundColor: "#ef4444",
          borderRadius: 4,
        },
        {
          label: "At Risk",
          data: showPercentage ? atRiskPercentages : atRiskData,
          backgroundColor: "#f59e0b",
          borderRadius: 4,
        },
        {
          label: "On Track",
          data: showPercentage ? onTrackPercentages : onTrackData,
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
        {
          label: "Unknown",
          data: showPercentage ? unknownPercentages : unknownData,
          backgroundColor: "#E2E8F0",
          borderRadius: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      barPercentage: 0.7,
      categoryPercentage: 0.6,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: "Google Sans",
              size: 11,
            },
            color: "#6b7280",
          },
        },
        y: {
          stacked: true,
          max: showPercentage ? 100 : undefined,
          grid: {
            color: "#f3f4f6",
            drawBorder: false,
          },
          ticks: {
            font: {
              family: "Google Sans",
              size: 11,
            },
            color: "#6b7280",
            callback: function (value: any) {
              return showPercentage ? `${value}%` : value;
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 15,
            font: {
              family: "Google Sans",
              size: 12,
            },
            color: "#4b5563",
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            boxHeight: 8,
          },
        },
        tooltip: {
          titleFont: {
            family: "Google Sans",
            size: 13,
            weight: "600",
          },
          bodyFont: {
            family: "Google Sans",
            size: 12,
          },
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: function (context: any) {
              return context[0].label;
            },
            afterTitle: function (context: any) {
              const weekIndex = context[0].dataIndex;
              const total = totals[weekIndex];
              return `Total: ${total} OKRs`;
            },
            label: function (context: any) {
              const label = context.dataset.label || "";
              const weekIndex = context.dataIndex;
              const actualData = data[weekIndex];

              let count = 0;
              if (label === "On Track") count = actualData.onTrack;
              if (label === "At Risk") count = actualData.atRisk;
              if (label === "Behind") count = actualData.behind;
              if (label === "Unknown") count = actualData.unknown;

              const total = totals[weekIndex];
              const percentage =
                total > 0 ? ((count / total) * 100).toFixed(0) : 0;

              // Calculate trend from previous week
              let trendIndicator = "";
              if (weekIndex > 0) {
                const prevData = data[weekIndex - 1];
                let prevCount = 0;
                if (label === "On Track") prevCount = prevData.onTrack;
                if (label === "At Risk") prevCount = prevData.atRisk;
                if (label === "Behind") prevCount = prevData.behind;
                if (label === "Unknown") prevCount = prevData.unknown;

                const prevTotal =
                  prevData.onTrack +
                  prevData.atRisk +
                  prevData.behind +
                  prevData.unknown;
                const prevPercentage =
                  prevTotal > 0
                    ? ((prevCount / prevTotal) * 100).toFixed(0)
                    : 0;

                if (Number(percentage) > Number(prevPercentage)) {
                  trendIndicator = ` ↑`;
                } else if (Number(percentage) < Number(prevPercentage)) {
                  trendIndicator = ` ↓`;
                }
              }

              return `${label}: ${count} (${percentage}%)${trendIndicator}`;
            },
          },
        },
      },
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
    };

    // Show message if not enough data
    if (!loading && data.length < 4) {
      return (
        <div className={clsx("okr-stack-bar", className)}>
          {title && <h3 className="okr-stack-bar__title">{title}</h3>}
          <div className="okr-stack-bar__empty">
            <p className="okr-stack-bar__empty-message">
              Need at least 4 weeks of check-in data to show trends
            </p>
            <p className="okr-stack-bar__empty-subtitle">
              Current data points: {data.length}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={clsx("okr-stack-bar", className)}>
        {title && <h3 className="okr-stack-bar__title">{title}</h3>}
        <IconButton className="widget-btn" variant="outline">
          <FaWandMagicSparkles size={15}/>
        </IconButton>
        {loading ? (
          <div className="okr-stack-bar__loading">
            <div className="okr-stack-bar__skeleton okr-stack-bar__skeleton--chart" />
            <div className="okr-stack-bar__skeleton okr-stack-bar__skeleton--legend" />
          </div>
        ) : (
          <div className="okr-stack-bar__container">
            <Bar data={chartConfig} options={options as never} />
          </div>
        )}
      </div>
    );
  }
);

export default OKRStackBar;
