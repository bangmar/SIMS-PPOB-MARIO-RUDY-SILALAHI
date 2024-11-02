// store/serviceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TServiceData } from "../../module/home/section/services/types";

interface ServiceState {
	selectedService: TServiceData | null;
}

const initialState: ServiceState = {
	selectedService: null,
};

const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		setSelectedService: (state, action: PayloadAction<TServiceData>) => {
			state.selectedService = action.payload;
		},
		clearSelectedService: (state) => {
			state.selectedService = null;
		},
	},
});

export const { setSelectedService, clearSelectedService } =
	serviceSlice.actions;
export default serviceSlice.reducer;
