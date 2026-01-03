import { Link } from "react-router-dom";
import clsx from "clsx";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import type { IconType } from "react-icons";

export interface NavItem {
  path: string;
  label: string;
  icon: IconType;
  children?: { path: string; label: string }[];
}

interface NavigationItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isExpanded: boolean;
  isActive: (path: string) => boolean;
  isParentActive: (item: NavItem) => boolean;
  onToggleExpand: (path: string) => void;
}

export const NavigationItem = ({
  item,
  isCollapsed,
  isExpanded,
  isActive,
  isParentActive,
  onToggleExpand,
}: NavigationItemProps) => {
  if (item.children) {
    return (
      <>
        <div
          className={clsx("navigation-item", {
            active: isParentActive(item),
          })}
          onClick={() => onToggleExpand(item.path)}
        >
          <item.icon size={20} />
          <div className="navigation-item-label">{item.label}</div>
          {!isCollapsed && (
            <span style={{ marginLeft: "auto" }}>
              {isExpanded ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
            </span>
          )}
        </div>
        {isExpanded && !isCollapsed && (
          <div className="nav-children">
            {item.children.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className={clsx("navigation-item child", {
                    active: isActive(child.path),
                  })}
                >
                  <div className="navigation-item-label">{child.label}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        className={clsx("navigation-item", {
          active: isActive(item.path),
        })}
      >
        <item.icon size={20} />
        <div className="navigation-item-label">{item.label}</div>
      </div>
    </Link>
  );
};
