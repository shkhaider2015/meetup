export type DatePicker = {
    defaultValue?: string;
    onChange?: (val:string) => void;
    open?: boolean;
    onClose?: () => void
}