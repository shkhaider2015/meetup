export type DatePicker = {
    defaultValue?: string;
    onChange?: (val:Date | string) => void;
    onConfirm?: (val:Date | string) => void;
    open?: boolean;
    onCancel?: () => void;
    type?: "DATE" | "TIME" | "DATE_AND_TIME"
}