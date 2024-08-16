export type PostInputProps = {
    onPress?: () => void
}

export type PostInputMenu = {
    onPressImageIcon?: () => void;
    onPressLocationIcon?: () => void;
    onPressDateIcon?: () => void;
    onPressTimeIcon?: () => void;
}

export type PostHeaderProps = {
    onCancel?: () => void;
    onPost?: () => void;
}