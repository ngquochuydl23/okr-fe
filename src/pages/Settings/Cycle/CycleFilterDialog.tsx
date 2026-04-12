import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

interface CycleFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CycleFilterDialog({ open, onOpenChange }: CycleFilterDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{t("MODULES.SETTINGS.CYCLE_MANAGEMENT.FILTER_DIALOG.FILTER_CYCLES")}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {t("MODULES.SETTINGS.CYCLE_MANAGEMENT.FILTER_DIALOG.FILTER_CYCLES_DESCRIPTION")}
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <Text size="2" color="gray">No filters available yet.</Text>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => onOpenChange(false)}>
              {t("COMMON.BUTTON.CLOSE")}
            </Button>
          </Dialog.Close>
          <Button onClick={() => onOpenChange(false)}>
            {t("COMMON.BUTTON.APPLY")}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}