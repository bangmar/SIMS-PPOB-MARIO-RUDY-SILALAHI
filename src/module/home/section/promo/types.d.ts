export type TPromoResponse = {
	status: number;
	message: string;
	data: TPromoData[];
};

export type TPromoData = {
	banner_name: string;
	banner_image: string;
	description: string;
};
