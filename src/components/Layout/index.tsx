import { useState, useMemo, useCallback, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { RiSettings3Line } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { Chatbot } from "../Chatbot";
import LoadingScreen from "../LoadingScreen";
import NotificationDrawer from "../NotificationDrawer";
import { SidebarHeader } from "./SidebarHeader";
import { NavigationItem } from "./NavigationItem";
import { WorkspacesList } from "./WorkspacesList";
import { Header } from "./Header";
import { useNavItems } from "./useNavItems";
import "./layout.scss";

const DESKTOP_BREAKPOINT = 1024;

const MOCK_WORKSPACES = [
  { id: "1", name: "IT Department", logo: null, active: true },
  { id: "2", name: "Digital Banking", logo: null, active: false },
  { id: "3", name: "Core Banking", logo: null, active: false },
  { id: "4", name: "Mobile Apps", logo: null, active: false },
  { id: "5", name: "Risk Management", logo: null, active: false },
  { id: "6", name: "Customer Service", logo: null, active: false },
  { id: "7", name: "Data Analytics", logo: null, active: false },
];

export default function Layout() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [openWorkspaceDialog, setOpenWorkspaceDialog] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);

  const isDesktop = useCallback(
    () => window.innerWidth >= DESKTOP_BREAKPOINT,
    []
  );

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  const isAdmin = user?.roles.includes("admin") ?? false;
  const navItems = useNavItems(isAdmin);
  const displayedWorkspaces = useMemo(() => MOCK_WORKSPACES.slice(0, 5), []);

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: any): boolean => {
    if (item.children) {
      const isAnyChildActive = item.children.some((child: any) =>
        location.pathname.startsWith(child.path)
      );
      if (isAnyChildActive) return false;
    }
    return isActive(item.path);
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleSidebarToggle = () => {
    if (isDesktop()) {
      setIsCollapsed((prev) => {
        if (!prev) setExpandedItems([]);
        return !prev;
      });
    } else {
      setIsMobileOpen((prev) => {
        if (prev) setExpandedItems([]);
        return !prev;
      });
    }
  };

  const closeMobileSidebar = () => setIsMobileOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/settings/profile");
  };

  if (isLoading || !user) return <LoadingScreen />;

  return (
    <div className="layout-container">
      <div
        className={clsx("sidebar-overlay", { visible: isMobileOpen })}
        onClick={closeMobileSidebar}
      />
      <div className={clsx("sidebar", { collapse: isCollapsed, "mobile-open": isMobileOpen })}>
        <SidebarHeader isCollapsed={isCollapsed} onToggle={handleSidebarToggle} />

        <div className="navigation-container">
          {navItems.map((item) => (
            <div key={item.path}>
              <NavigationItem
                item={item}
                isCollapsed={isCollapsed}
                isExpanded={expandedItems.includes(item.path)}
                isActive={isActive}
                isParentActive={isParentActive}
                onToggleExpand={toggleExpanded}
              />
            </div>
          ))}
        </div>

        <WorkspacesList
          workspaces={MOCK_WORKSPACES}
          displayedWorkspaces={displayedWorkspaces}
          isCollapsed={isCollapsed}
        />

        <div className="navigation-container" style={{ marginTop: "auto", marginBottom: "1rem" }}>
          <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={clsx("navigation-item", { active: isActive("/settings") })}>
              <RiSettings3Line size={20} />
              <div className="navigation-item-label">Settings</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="main-section">
        <Header
          onMenuClick={handleSidebarToggle}
          onNotificationClick={() => setOpenNotificationDrawer(true)}
          onProfileClick={handleProfile}
          onLogoutClick={handleLogout}
          openWorkspaceDialog={openWorkspaceDialog}
          onWorkspaceDialogChange={setOpenWorkspaceDialog}
        />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>

      <Chatbot />
      <NotificationDrawer
        open={openNotificationDrawer}
        onOpenChange={setOpenNotificationDrawer}
      />
    </div>
  );
}
