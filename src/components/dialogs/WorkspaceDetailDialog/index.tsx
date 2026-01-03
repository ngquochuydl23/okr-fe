import { Dialog, Flex, Button, DataList } from "@radix-ui/themes";
import type { ReactNode } from "react";

export interface WorkspaceDetail {
  label: string;
  value: string | ReactNode;
}

export interface WorkspaceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  trigger?: ReactNode;
}

const WorkspaceDetailDialog = ({
  open,
  onOpenChange,
  title = "Workspace Details",
  description = "View detailed information about this workspace",
  trigger,
}: WorkspaceDetailDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Content maxWidth="550px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>
        <DataList.Root>
    
        </DataList.Root>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WorkspaceDetailDialog;
