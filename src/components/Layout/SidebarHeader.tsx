import { IconButton } from "@radix-ui/themes";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarHeader = ({ isCollapsed, onToggle }: SidebarHeaderProps) => {
  return (
    <div className="sidebar-header">
      <IconButton variant="ghost" size="2" className="toggle-btn" onClick={onToggle}>
        {isCollapsed ? (
          <TbLayoutSidebarLeftExpand size={20} />
        ) : (
          <TbLayoutSidebarLeftCollapse size={20} />
        )}
      </IconButton>
    </div>
  );
};
