import { IPost } from "./post"

export type UserModalProps = {
    data: IPost;
    open: boolean;
    onClose: () => void;
}