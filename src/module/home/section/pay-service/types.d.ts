export type TPayServiceResponse = {
	status: number;
	message: string;
	data: unknown;
};

export type TPayServicePayload = {
	service_code: string;
};
