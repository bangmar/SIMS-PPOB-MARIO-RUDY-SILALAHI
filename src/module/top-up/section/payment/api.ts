import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TTopUpPayload, TTopUpResponse } from "./types";
import api from "../../../../services/api";

export const useTopUp = (): UseMutationResult<
	TTopUpResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TTopUpPayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["top-up"],
		mutationFn: async (payload: TTopUpPayload) => {
			const { data } = await api.post("/topup", payload);

			return data;
		},
	});
};
