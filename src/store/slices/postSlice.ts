import { POST } from "@/constants/reducer";
import { getItem, removeItem, setItem } from "@/storage";
import { IPostReducer } from "@/types/reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:IPostReducer[] = getItem<IPostReducer[]>(POST) || [];


const postSlice = createSlice({
    name: POST,
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPostReducer[]>) => {
            setItem(POST, action.payload);
            return action.payload
        },
        clearPosts: () => {
            removeItem(POST);
            return []
        },
        updatePosts: (state, action: PayloadAction<IPostReducer>) => {
            const posts = [action.payload, ...state];
            setItem(POST, posts);
            return posts
        },
        deletePost: (state, action: PayloadAction<{id: string}>) => {
            const posts = state.filter(item => item._id !== action.payload.id);
            setItem(POST, posts);
            return posts
        }
    }
})

export const { setPosts, clearPosts, updatePosts, deletePost } = postSlice.actions;
export default postSlice.reducer; 