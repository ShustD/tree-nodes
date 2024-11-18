import { configureStore } from "@reduxjs/toolkit";

import treeNodesReducer from "./treeNodeSlice"

export const store = configureStore({
    reducer: {
        treeNodes: treeNodesReducer
    },
})