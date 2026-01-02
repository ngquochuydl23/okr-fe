import { memo } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import "./dashboard-card.scss";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { FaWandMagicSparkles } from "react-icons/fa6";

export interface DashboardCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "error";
  loading?: boolean;
  onClick?: () => void;
  footer?: ReactNode;
  badge?: string | number;
  className?: string;
}

const DashboardCard = memo<DashboardCardProps>(
  ({
    title,
    value,
    subtitle,
    icon,
    trend,
    variant = "default",
    loading = false,
    onClick,
    badge,
    className,
  }) => {
    return (
      <div
        className={clsx(
          "dashboard-card",
          `dashboard-card--${variant}`,
          {
            "dashboard-card--clickable": !!onClick,
            "dashboard-card--loading": loading,
          },
          className
        )}
        onClick={onClick}
      >
        {loading ? (
          <div className="dashboard-card__loading">
            <div className="dashboard-card__skeleton dashboard-card__skeleton--title" />
            <div className="dashboard-card__skeleton dashboard-card__skeleton--value" />
            <div className="dashboard-card__skeleton dashboard-card__skeleton--subtitle" />
          </div>
        ) : (
          <>
            <div className="dashboard-card__header">
              {icon && <div className="dashboard-card__icon">{icon}</div>}
              <div className="dashboard-card__header-content">
                {title && <h3 className="dashboard-card__title">{title}</h3>}
                {badge !== undefined && (
                  <span className="dashboard-card__badge">{badge}</span>
                )}
              </div>
            </div>

            {value !== undefined && (
              <div className="dashboard-card__value">
                {value}
                {trend && (
                  <span
                    className={clsx("dashboard-card__trend", {
                      "dashboard-card__trend--positive": trend.isPositive,
                      "dashboard-card__trend--negative": !trend.isPositive,
                    })}
                  >
                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    {trend.label && (
                      <span className="dashboard-card__trend-label">
                        {trend.label}
                      </span>
                    )}
                  </span>
                )}
              </div>
            )}
            {subtitle && <p className="dashboard-card__subtitle">{subtitle}</p>}
            <Tooltip content="Get me more insights">
              <IconButton className="widget-btn" variant="outline">
                <FaWandMagicSparkles size={15}/>
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    );
  }
);

export default DashboardCard;
