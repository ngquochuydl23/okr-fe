import { useMemo } from "react";
import { TbLayoutDashboard, TbTargetArrow } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { HiOutlineFlag } from "react-icons/hi";
import type { NavItem } from "./NavigationItem";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const useNavItems = (isAdmin: boolean): NavItem[] => {
  const { t } = useTranslation();
  return useMemo(() => {
    const items: NavItem[] = [
      { path: "/", label: t("SIDEBAR.DASHBOARD"), icon: TbLayoutDashboard },
      {
        path: "/objectives",
        label: t("SIDEBAR.OBJECTIVES"),
        icon: TbTargetArrow,
        children: [
          { path: "/objectives/workspace", label: t("SIDEBAR.CHILD_OBJECTIVES.WORKSPACE") },
          { path: "/objectives/team", label: t("SIDEBAR.CHILD_OBJECTIVES.TEAM") },
          { path: "/objectives/personal", label: t("SIDEBAR.CHILD_OBJECTIVES.PERSONAL") },
          { path: "/objectives/supporting", label: t("SIDEBAR.CHILD_OBJECTIVES.SUPPORTING") },
        ],
      },
      { path: "/key-results", label: t("SIDEBAR.KEY_RESULTS"), icon: HiOutlineFlag },
      { path: "/missions", label: t("SIDEBAR.MISSIONS"), icon: MdOutlineRocketLaunch },
      { path: "/teams", label: t("SIDEBAR.TEAMS"), icon: RiTeamLine },
    ];

    if (isAdmin) {
      items.push({
        path: "/admin",
        label: "Admin Panel",
        icon: TbTargetArrow,
      });
    }

    return items;
  }, [isAdmin]);
};
