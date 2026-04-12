import { Dialog, Flex, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { TbCalendarOff } from "react-icons/tb";
import "./ask-create-cycle-dialog.scss";
import { useTranslation } from 'react-i18next';

export interface AskCreateCycleDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AskCreateCycleDialog = ({ open, onOpenChange }: AskCreateCycleDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoToSettings = () => {
    onOpenChange?.(false);
    navigate("/settings/cycles");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Flex direction="column" align="center" gap="3" py="4">
          <TbCalendarOff className="create-cycle-dialog__icon" />
          <Dialog.Title align="center">{t('DIALOG.ASK_CREATE_CYCLE.NO_ACTIVE_CYCLE_FOUND')}</Dialog.Title>
          <Dialog.Description size="2" align="center" mb="2">
            {t('DIALOG.ASK_CREATE_CYCLE.DESCRIPTION')}
          </Dialog.Description>
        </Flex>
        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">{t('DIALOG.ASK_CREATE_CYCLE.LATER_BUTTON')}</Button>
          </Dialog.Close>
          <Button onClick={handleGoToSettings}>
            {t('DIALOG.ASK_CREATE_CYCLE.GO_TO_SETTINGS')}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AskCreateCycleDialog;
