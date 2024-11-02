export interface TProfileResponse {
	status: number;
	message: string;
	data: TProfileData;
}

export interface TProfileData {
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
}
