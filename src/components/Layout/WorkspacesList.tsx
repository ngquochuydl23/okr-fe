import clsx from "clsx";

interface Workspace {
  id: string;
  name: string;
  logo: string | null;
  active: boolean;
}

interface WorkspacesListProps {
  workspaces: Workspace[];
  displayedWorkspaces: Workspace[];
  isCollapsed: boolean;
}

export const WorkspacesList = ({
  workspaces,
  displayedWorkspaces,
  isCollapsed,
}: WorkspacesListProps) => {
  return (
    <div className="workspaces">
      <div className="label">Workspaces</div>
      <div className="workspace-list">
        {displayedWorkspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={clsx("workspace-item", { active: workspace.active })}
          >
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
