import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar-scice/SnackBarSlice";
import transactionReducer from "./transaction-history-slice/TransactionHistoySlice";
import serviceReducer from "./service-slice/ServiceSlice";

const store = configureStore({
	reducer: {
		snackbar: snackbarReducer,
		transactions: transactionReducer,
		service: serviceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
