import type { PagineatedResponseDto } from "../common.dtos";
import type { WorkspaceDto } from "./dtos";
import { http } from "../config";

export interface IWorkspaceService {
  getMyWorkspaces: () => Promise<PagineatedResponseDto<WorkspaceDto>>;
  getCurrentWorkspace: () => Promise<WorkspaceDto>;
}

export const WorkspaceService: IWorkspaceService = {
  async getMyWorkspaces(): Promise<PagineatedResponseDto<WorkspaceDto>> {
    return http.get("/workspaces")
  },
  async getCurrentWorkspace(): Promise<WorkspaceDto> {
    return http.get("/workspaces/current")
  }
}