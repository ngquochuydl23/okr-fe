import type { WorkspaceDto } from "@/services/workspace/dtos";
import clsx from "clsx";

interface WorkspacesListProps {
  workspaces: WorkspaceDto[];
  isCollapsed: boolean;
}

export const WorkspacesList = ({
  workspaces,
  isCollapsed,
}: WorkspacesListProps) => {
  return (
    <div className="workspaces">
      <div className="label">Workspaces</div>
      <div className="workspace-list">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className={clsx("workspace-item")}>
            {!isCollapsed && <span className="workspace-item-name">{workspace.name}</span>}
          </div>
        ))}
        {!isCollapsed && workspaces.length > 5 && (
          <div className="view-more-btn">View more</div>
        )}
      </div>
    </div>
  );
};
