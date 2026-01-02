import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@radix-ui/themes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import "./layout.scss";
import clsx from "clsx";
import { Avatar } from "../Avatar";
import { TbTargetArrow } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { HiOutlineFlag } from "react-icons/hi";
import { Chatbot } from "../Chatbot";
import { useLoading } from "@/contexts/LoadingContextProvider";
import LoadingScreen from "../LoadingScreen";
import { MdNotificationsNone } from "react-icons/md";

export default function Layout() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { showLoading } = useLoading();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems = [
    { path: "/", label: "Dashboard", icon: TbLayoutDashboard },
    {
      path: "/objectives",
      label: "Objectives",
      icon: TbTargetArrow,
      children: [
        { path: "/objectives/strategic", label: "Strategic" },
        { path: "/objectives/operational", label: "Operational" },
        { path: "/objectives/team", label: "Team" },
        { path: "/objectives/personal", label: "Personal" },
        { path: "/objectives/quarterly", label: "Quarterly" },
      ],
    },
    { path: "/key-results", label: "Key Results", icon: HiOutlineFlag },
    { path: "/teams", label: "Teams", icon: RiTeamLine },
  ];

  // Add admin link if user is admin
  if (user?.roles.includes("admin")) {
    navItems.push({
      path: "/admin",
      label: "Admin Panel",
      icon: TbTargetArrow,
    });
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  if (isLoading || !user) return <LoadingScreen />;

  return (
    <div className="layout-container">
      <div className={clsx("sidebar", { collapse: isCollapsed })}>
        <div className="sidebar-header">
          <IconButton
            variant="ghost"
            size="2"
            className="toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <TbLayoutSidebarLeftExpand size={20} />
            ) : (
              <TbLayoutSidebarLeftCollapse size={20} />
            )}
          </IconButton>
        </div>
        <div className="navigation-container">
          {navItems.map((item) => (
            <div key={item.path}>
              {item.children ? (
                <>
                  <div
                    className={clsx("navigation-item", {
                      active: isActive(item.path),
                    })}
                    onClick={() => toggleExpanded(item.path)}
                  >
                    <item.icon size={20} />
                    <div className="navigation-item-label">{item.label}</div>
                    {!isCollapsed && (
                      <span style={{ marginLeft: "auto" }}>
                        {expandedItems.includes(item.path) ? (
                          <RiArrowUpSLine size={20} />
                        ) : (
                          <RiArrowDownSLine size={20} />
                        )}
                      </span>
                    )}
                  </div>
                  {expandedItems.includes(item.path) && (
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
                            <div className="navigation-item-label">
                              {child.label}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    className={clsx("navigation-item", {
                      active: isActive(item.path),
                    })}
                  >
                    <item.icon size={20} />
                    <div className="navigation-item-label">{item.label}</div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="workspaces">
          <div className="label">Workspaces</div>
          <div></div>
        </div>

        <div className="navigation-container" style={{ marginBottom: "1rem" }}>
          <Link
            key={""}
            to={"/settings"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className={clsx("navigation-item", {
                active: isActive("/settings"),
              })}
            >
              <RiSettings3Line size={20} />
              <div className="navigation-item-label">Settings</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="main-section">
        <div className="main-section-header">
          <div className="workspace-header">
            <img
              className="workspace-logo"
              src="https://diadiembank.com/wp-content/uploads/2024/09/logo-hdbank.svg"
            />
            <div>
              <div className="workspace-name">HDBank IT Lab</div>
              <div className="vision-name">Banking Beyond Boundaries</div>
            </div>
          </div>
          <div className="right">
            <IconButton variant="ghost">
              <MdNotificationsNone size={24} color="var(--gray-12)"/>
            </IconButton>
            <Avatar
              fallback="Nguyễn Quốc Huy"
              size="3"
              src="https://img.freepik.com/premium-psd/3d-avatar-3d-cartoon-character-3d-cute-asian-woman-avatar-smiling-girl-png-illustration-website_532044-917.jpg"
            />
          </div>
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
