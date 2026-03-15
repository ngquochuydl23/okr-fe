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
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  createdAt: string; // ISO date string
  lastUpdatedAt: string; // ISO date string
}
