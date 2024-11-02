export type TLoginResponse = {
	status: number;
	message: string;
	data: {
		token: string;
	};
};

export type TLoginPayload = {
	email: string;
	password: string;
};
