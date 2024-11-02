export type TUpdateProfileResponse = {
	status: number;
	message: string;
	data: TUpdateProfileData;
};

export type TUpdateProfileData = {
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
};

export type TUpdateProfilePayload = {
	email: ?string;
	first_name?: string;
	last_name: ?string;
};
export type TUpdateProfileImagePayload = {
	file: File;
};
