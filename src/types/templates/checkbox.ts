export interface ICheckbox {
    checked?: boolean;
    onChange?: (checked:boolean) => void;
    onBlur?: () => void;
}