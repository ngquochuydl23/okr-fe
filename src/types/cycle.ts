export interface WorkspaceDTO {
  id: string;
  name: string;
  // Add other fields as necessary
}

export interface CycleDTO {
  id: string;
  name: string;
  description: string;
  workspace: WorkspaceDTO;
  createdAt: string; // ISO date string
  lastUpdatedAt: string; // ISO date string
}
