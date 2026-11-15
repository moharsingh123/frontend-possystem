import { createSlice } from "@reduxjs/toolkit";
import {
    createBranch,
    deleteBranch,
    getAllBranchesByStore,
    getBranchById,
    updateBranch,
} from "./branchThunk";

const initialState = {
    branch: null,
    branches: [],
    employees: [],
    loading: false,
    error: null,
};

const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.branches.push(action.payload);
            })
            .addCase(createBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBranchById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBranchById.fulfilled, (state, action) => {
                state.loading = false;
                state.branch = action.payload;
            })
            .addCase(getBranchById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllBranchesByStore.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload;
            })
            .addCase(getAllBranchesByStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.branch = action.payload;
                state.branches = state.branches.map((branch) =>
                    branch.id === action.payload.id ? action.payload : branch,
                );
            })
            .addCase(deleteBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = state.branches.filter(
                    (branch) => branch.id !== action.payload,
                );
                if (state.branch?.id === action.payload) {
                    state.branch = null;
                }
            });
    },
});

export default branchSlice.reducer;