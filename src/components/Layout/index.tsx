import { useState, useMemo, useCallback, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { RiSettings3Line } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Chatbot } from "../Chatbot";
import LoadingScreen from "../LoadingScreen";
import NotificationDrawer from "../NotificationDrawer";
import { SidebarHeader } from "./SidebarHeader";
import { NavigationItem } from "./NavigationItem";
import { WorkspacesList } from "./WorkspacesList";
import { Header } from "./Header";
import { useNavItems } from "./useNavItems";
import "./layout.scss";
import { useAsync } from 'react-use';
import { WorkspaceService } from "@/services/workspace";
import { setCurrentWorkspace, setCurrentCycle } from "@/store/slices/contextSlice";
import { CycleService } from "@/services/cycle";
import AskCreateCycleDialog from "../dialogs/AskCreateCycleDialog";
import { useTranslation } from "react-i18next";

const DESKTOP_BREAKPOINT = 1024;

export default function Layout() {
  const { t } = useTranslation();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [openWorkspaceDialog, setOpenWorkspaceDialog] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const [openCreateCycleDialog, setOpenCreateCycleDialog] = useState(false);

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

  const isAdmin = useMemo(() => user?.roles?.includes("admin") || false, [user]);
  const navItems = useNavItems(isAdmin);

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

  const { loading: wpLoading, value: workspaces, error } = useAsync(async () => {
    if (!user) {
      return [];
    }
    const response = await WorkspaceService.getMyWorkspaces();
    return response.items;
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/settings/profile");
  };

  const getContextData = async () => {
    if (!isLoading && !user) {
      return;
    }
    try {
      const currentWorkspace = await WorkspaceService.getCurrentWorkspace();
      dispatch(setCurrentWorkspace(currentWorkspace));

      if (currentWorkspace) {
        const currentCycle = await CycleService.getCurrentCycle();
        dispatch(setCurrentCycle(currentCycle));
      }
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
      if (error?.message === "Cycle not found.") {
        setOpenCreateCycleDialog(true);
        return;
      }
    }
  }

  useEffect(() => {
    getContextData();
  }, [user]);

  if (isLoading || !user) return <LoadingScreen />;

  return (
    <div className="layout-container">
      <div className={clsx("sidebar-overlay", { visible: isMobileOpen })} onClick={closeMobileSidebar} />
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
        {wpLoading && <div style={{ padding: "1rem" }}>Loading workspaces...</div>}
        {error && <div style={{ padding: "1rem", color: "red" }}>Failed to load workspaces</div>}
        {workspaces && (
          <WorkspacesList
            workspaces={workspaces}
            isCollapsed={isCollapsed}
          />
        )}
        <div className="navigation-container" style={{ marginTop: "auto", marginBottom: "1rem" }}>
          <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={clsx("navigation-item", { active: isActive("/settings") })}>
              <RiSettings3Line size={20} />
              <div className="navigation-item-label">{t("SIDEBAR.SETTINGS")}</div>
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
      <AskCreateCycleDialog
        open={openCreateCycleDialog}
        onOpenChange={setOpenCreateCycleDialog}
      />
    </div>
  );
}
