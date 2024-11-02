export type TServiceResponse = {
	status: number;
	message: string;
	data: TServiceData[];
};

export type TServiceData = {
	service_code: string;
	service_name: string;
	service_icon: string;
	service_tariff: number;
};
