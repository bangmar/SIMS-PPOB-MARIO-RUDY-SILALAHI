export type TTopUpResponse = {
	status: number;
	message: string;
	data: {
		balance: number;
	};
};

export type TTopUpPayload = {
	top_up_amount: number;
};
