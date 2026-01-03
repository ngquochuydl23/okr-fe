import { useMemo } from "react";
import {
  TbLayoutDashboard,
  TbTargetArrow,
} from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { HiOutlineFlag } from "react-icons/hi";
import type { NavItem } from "./NavigationItem";

export const useNavItems = (isAdmin: boolean): NavItem[] => {
  return useMemo(() => {
    const items: NavItem[] = [
      { path: "/", label: "Dashboard", icon: TbLayoutDashboard },
      {
        path: "/objectives",
        label: "Objectives",
        icon: TbTargetArrow,
        children: [
          { path: "/objectives/workspace", label: "Workspace" },
          { path: "/objectives/team", label: "Team" },
          { path: "/objectives/personal", label: "Personal" },
          { path: "/objectives/supporting", label: "Supporting" },
        ],
      },
      { path: "/key-results", label: "Key Results", icon: HiOutlineFlag },
      { path: "/teams", label: "Teams", icon: RiTeamLine },
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
