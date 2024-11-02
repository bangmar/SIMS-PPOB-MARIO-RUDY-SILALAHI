import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTransactionHistoryData } from "../../module/transaction-history/record/types";

interface TransactionState {
	records: TTransactionHistoryData["records"];
	offset: number;
	limit: number;
}

const initialState: TransactionState = {
	records: [],
	offset: 0,
	limit: 3,
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		setTransactions: (
			state,
			action: PayloadAction<TTransactionHistoryData["records"]>
		) => {
			state.records = action.payload; // Replace existing records
		},
		addTransactions: (
			state,
			action: PayloadAction<TTransactionHistoryData["records"]>
		) => {
			state.records.push(...action.payload); // Append new records
		},
		setOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		clearTransactions: (state) => {
			state.records = []; // Clear records
		},
	},
});

export const {
	setTransactions,
	addTransactions,
	setOffset,
	setLimit,
	clearTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
