import { ObjectiveType } from "@/constants/objective.constants";
import type { Objective } from ".";

export interface ObjectiveTableColumn {
  key: keyof Objective;
  label: string;
  align?: "left" | "center" | "right";
}

export const DEFAULT_COLUMNS: ObjectiveTableColumn[] = [
  { key: "title", label: "Objective & Key results" },
  { key: "cycle", label: "Cycle" },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress" },
  { key: "owner", label: "Owner" },   
  { key: "dueDate", label: "Due Date" },
];

export type ObjectiveTypeValue = typeof ObjectiveType[keyof typeof ObjectiveType];