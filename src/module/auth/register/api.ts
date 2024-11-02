import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TRegisterPayload, TRegisterResponse } from "./types";
import api from "../../../services/api";

export const useRegister = (): UseMutationResult<
	TRegisterResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TRegisterPayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (payload: TRegisterPayload) => {
			const { data } = await api.post("/registration", payload);

			return data;
		},
	});
};
