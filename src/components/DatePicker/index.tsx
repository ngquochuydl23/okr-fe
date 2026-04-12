import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parse, isValid } from "date-fns";
import { Button, Popover } from "@radix-ui/themes";
import { CalendarIcon } from "@radix-ui/react-icons";
import "react-day-picker/style.css";
import "./date-picker.scss";
import CommonConstants from "@/constants/common.constans";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const selected = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;
  const isSelectedValid = selected && isValid(selected);

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      onChange?.(format(day, "yyyy-MM-dd"));
    } else {
      onChange?.("");
    }
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button
          variant="surface"
          color="gray"
          disabled={disabled}
          className={`date-picker-trigger ${!isSelectedValid ? "date-picker-trigger--empty" : ""}`}
        >
          <CalendarIcon />
          <span className="date-picker-trigger__label">{isSelectedValid ? format(selected, CommonConstants.DateFormat) : placeholder}</span>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="date-picker-popover" side="bottom" align="start">
        <DayPicker
          mode="single"
          selected={isSelectedValid ? selected : undefined}
          onSelect={handleSelect}
          defaultMonth={isSelectedValid ? selected : undefined}
          disabled={[
            ...(fromDate ? [{ before: fromDate }] : []),
            ...(toDate ? [{ after: toDate }] : []),
          ]}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
