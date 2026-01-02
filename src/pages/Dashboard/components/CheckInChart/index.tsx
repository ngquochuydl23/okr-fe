import { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import "./check-in-chart.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CheckInChartProps {
  title?: string;
  data?: {
    onTrack: number;
    atRisk: number;
    behind: number;
  };
  loading?: boolean;
  className?: string;
}

const CheckInChart = memo<CheckInChartProps>(
  ({ title = "OKR Status Overview", data, loading = false, className }) => {
    const chartData = data || { onTrack: 0, atRisk: 0, behind: 0 };
    const total = chartData.onTrack + chartData.atRisk + chartData.behind;

    const chartConfig = {
      labels: ["On Track", "At Risk", "Behind"],
      datasets: [
        {
          label: "OKR Status",
          data: [chartData.onTrack, chartData.atRisk, chartData.behind],
          backgroundColor: [
            "#10b981", // Green - On Track
            "#f59e0b", // Orange - At Risk
            "#ef4444", // Red - Behind
          ],
          borderColor: ["#ffffff", "#ffffff", "#ffffff"],
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right" as const,
          labels: {
            padding: 15,
            font: {
              family: "Google Sans",
              size: 14,
            },
            usePointStyle: true,
            pointStyle: "circle",
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
          callbacks: {
            label: function (context: any) {
              const label = context.label || "";
              const value = context.parsed || 0;
              const percentage =
                total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      cutout: "85%",
    };

    return (
      <div className={clsx("check-in-chart", className)}>
        {title && <h3 className="check-in-chart__title">{title}</h3>}
        {loading ? (
          <div className="check-in-chart__loading">
            <div className="check-in-chart__skeleton check-in-chart__skeleton--chart" />
            <div className="check-in-chart__skeleton check-in-chart__skeleton--legend" />
          </div>
        ) : (
          <>
            <div className="check-in-chart__container">
              <Doughnut data={chartConfig} options={options as never} />
            </div>
            {data && (
              <div className="check-in-chart__summary">
                <div className="check-in-chart__summary-item check-in-chart__summary-item--on-track">
                  <span className="check-in-chart__summary-label">On Track</span>
                  <span className="check-in-chart__summary-value">
                    {data.onTrack}
                  </span>
                </div>
                <div className="check-in-chart__summary-item check-in-chart__summary-item--at-risk">
                  <span className="check-in-chart__summary-label">At Risk</span>
                  <span className="check-in-chart__summary-value">
                    {data.atRisk}
                  </span>
                </div>
                <div className="check-in-chart__summary-item check-in-chart__summary-item--behind">
                  <span className="check-in-chart__summary-label">Behind</span>
                  <span className="check-in-chart__summary-value">
                    {data.behind}
                  </span>
                </div>
                <div className="check-in-chart__summary-total">
                  Total: {total} OKRs
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export default CheckInChart;
