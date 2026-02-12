import { Dialog } from "@radix-ui/themes";
import type { Descendant } from "slate";
import type { Objective } from "@/pages/Objectives/components/ObjectiveTable";
import "./objective-detail-dialog.scss";
import ObjectiveDetailPanel from "@/components/objectives/ObjectiveDetailPanel";

export interface ObjectiveDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objective: Objective | null;
  color?: string;
  onSaveDescription?: (objectiveId: string, description: string, slateValue: Descendant[]) => Promise<void> | void;
}

const ObjectiveDetailDialog = ({
  open,
  onOpenChange,
  objective,
  color = "var(--blue-9)",
}: ObjectiveDetailDialogProps) => {

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="objective-detail-dialog__content">
        <ObjectiveDetailPanel
          objective={objective}
          color={color}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ObjectiveDetailDialog;
