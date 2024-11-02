export type TRegisterResponse = {
	status: number;
	message: string;
	data: unknown;
};

export type TRegisterPayload = {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
};
