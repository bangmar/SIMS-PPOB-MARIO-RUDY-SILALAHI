export interface TBalanceResponse {
	status: number;
	message: string;
	data: TBalanceData;
}

export interface TBalanceData {
	balance: number;
}
