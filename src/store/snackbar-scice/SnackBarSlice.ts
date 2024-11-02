// store/snackbarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
	message: string;
	variant: "success" | "error" | "info" | "warning" | undefined;
}

const initialState: SnackbarState = {
	message: "",
	variant: undefined,
};

const snackbarSlice = createSlice({
	name: "snackbar",
	initialState,
	reducers: {
		showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
			state.message = action.payload.message;
			state.variant = action.payload.variant;
		},
		hideSnackbar: (state) => {
			state.message = "";
			state.variant = undefined;
		},
	},
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
