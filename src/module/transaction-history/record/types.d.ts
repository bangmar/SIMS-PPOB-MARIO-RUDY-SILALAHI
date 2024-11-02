export type TTransactionHistoryResponse = {
	status: number;
	message: string;
	data: TTransactionHistoryData;
};

export type TTransactionHistoryData = {
	offset: number;
	limit: number;
	records: Record[];
};

export interface Record {
	invoice_number: string;
	transaction_type: string;
	description: string;
	total_amount: number;
	created_on: string;
}
