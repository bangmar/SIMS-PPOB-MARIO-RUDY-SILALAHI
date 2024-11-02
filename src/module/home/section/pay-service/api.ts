import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../../services/api";
import { TPayServicePayload, TPayServiceResponse } from "./types";

export const usePayService = (): UseMutationResult<
	TPayServiceResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TPayServicePayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["pay-service"],
		mutationFn: async (payload: TPayServicePayload) => {
			const { data } = await api.post("/transaction", payload);

			return data;
		},
	});
};
