import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../services/api";
import { TLoginPayload, TLoginResponse } from "./types";

export const useLogin = (): UseMutationResult<
	TLoginResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TLoginPayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (payload: TLoginPayload) => {
			const { data } = await api.post("/login", payload);

			return data;
		},
	});
};
