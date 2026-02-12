export interface KeyResultTableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

export const DEFAULT_KEY_RESULT_COLUMNS: KeyResultTableColumn[] = [
  { key: "title", label: "Key Result" },
  { key: "objectiveTitle", label: "Objective" },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress" },
  { key: "owner", label: "Owner" },
  { key: "dueDate", label: "Due Date" },
];
