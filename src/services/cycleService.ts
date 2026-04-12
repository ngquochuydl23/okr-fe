import type { CycleDTO } from "@/types/cycle";

// Mock data
let MOCK_CYCLES: CycleDTO[] = [
  {
    id: "1",
    name: "Q1 2024",
    description: "First Quarter 2024",
    workspace: { id: "w1", name: "Main Workspace" },
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Q2 2024",
    description: "Second Quarter 2024",
    workspace: { id: "w1", name: "Main Workspace" },
    startDate: "2024-04-01T00:00:00Z",
    endDate: "2024-06-30T23:59:59Z",
    createdAt: "2024-04-01T00:00:00Z",
    lastUpdatedAt: "2024-04-01T00:00:00Z",
  },
];

export const cycleService = {
  getAll: async (): Promise<CycleDTO[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_CYCLES]), 500);
    });
  },

  create: async (data: Pick<CycleDTO, "name" | "description" | "startDate" | "endDate">): Promise<CycleDTO> => {
    return new Promise((resolve) => {
      const newCycle: CycleDTO = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        description: data.description,
        workspace: { id: "w1", name: "Main Workspace" }, // Mock workspace
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
      };
      MOCK_CYCLES.push(newCycle);
      setTimeout(() => resolve(newCycle), 500);
    });
  },

  update: async (id: string, data: Partial<CycleDTO>): Promise<CycleDTO> => {
    return new Promise((resolve, reject) => {
      const index = MOCK_CYCLES.findIndex((c) => c.id === id);
      if (index === -1) {
        reject(new Error("Cycle not found"));
        return;
      }
      const updatedCycle = {
        ...MOCK_CYCLES[index],
        ...data,
        lastUpdatedAt: new Date().toISOString(),
      };
      MOCK_CYCLES[index] = updatedCycle;
      setTimeout(() => resolve(updatedCycle), 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      MOCK_CYCLES = MOCK_CYCLES.filter((c) => c.id !== id);
      setTimeout(() => resolve(), 500);
    });
  },
};
