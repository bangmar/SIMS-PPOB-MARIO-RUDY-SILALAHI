import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../services/api";
import {
	TUpdateProfileImagePayload,
	TUpdateProfilePayload,
	TUpdateProfileResponse,
} from "./types";
import { serialize } from "object-to-formdata";

export const useUpdateProfile = (): UseMutationResult<
	TUpdateProfileResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TUpdateProfilePayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["update-profile"],
		mutationFn: async (payload: TUpdateProfilePayload) => {
			const { data } = await api.put("/profile/update", payload);

			return data;
		},
	});
};
export const useUpdateProfileImage = (): UseMutationResult<
	TUpdateProfileResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TUpdateProfileImagePayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["update-profile-image"],
		mutationFn: async (payload: TUpdateProfileImagePayload) => {
			const { data } = await api.put("/profile/image", serialize(payload), {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return data;
		},
	});
};
