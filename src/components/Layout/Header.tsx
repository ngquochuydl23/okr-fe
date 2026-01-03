import { IconButton, Popover, Flex } from "@radix-ui/themes";
import { MdNotificationsNone } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Avatar } from "../Avatar";
import WorkspaceDetailDialog from "../dialogs/WorkspaceDetailDialog";

interface HeaderProps {
  onNotificationClick: () => void;
  onProfileClick: () => void;
  onLogoutClick: () => void;
  openWorkspaceDialog: boolean;
  onWorkspaceDialogChange: (open: boolean) => void;
}

export const Header = ({
  onNotificationClick,
  onProfileClick,
  onLogoutClick,
  openWorkspaceDialog,
  onWorkspaceDialogChange,
}: HeaderProps) => {
  return (
    <div className="main-section-header">
      <div className="workspace-header">
        <img
          className="workspace-logo"
          src="https://diadiembank.com/wp-content/uploads/2024/09/logo-hdbank.svg"
          alt="Workspace Logo"
        />
        <div>
          <WorkspaceDetailDialog
            open={openWorkspaceDialog}
            onOpenChange={onWorkspaceDialogChange}
            trigger={<div className="workspace-name">HDBank IT Lab</div>}
          />
          <div className="vision-name">Banking Beyond Boundaries</div>
        </div>
      </div>
      <div className="right">
        <IconButton variant="ghost" onClick={onNotificationClick}>
          <MdNotificationsNone size={24} color="var(--gray-12)" />
        </IconButton>
        <Popover.Root>
          <Popover.Trigger>
            <Flex gap="2" align="center" style={{ cursor: "pointer" }}>
              <Avatar
                fallback="Nguyễn Quốc Huy"
                size="3"
                src="https://img.freepik.com/premium-psd/3d-avatar-3d-cartoon-character-3d-cute-asian-woman-avatar-smiling-girl-png-illustration-website_532044-917.jpg"
              />
              <RiArrowDownSLine size={20} color="var(--gray-12)" />
            </Flex>
          </Popover.Trigger>
          <Popover.Content className="popover-content">
            <div className="popover-content-item" onClick={onProfileClick}>
              <span>
                <CgProfile size={20} />
              </span>
              Profile
            </div>
            <div className="popover-content-item" onClick={onLogoutClick}>
              <span>
                <BiLogOut size={20} />
              </span>
              Sign Out
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
};
