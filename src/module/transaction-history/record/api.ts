import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TTransactionHistoryData } from "./types";
import api from "../../../services/api";

export const useTransactionHistory = (
	offset: number,
	limit: number
): UseQueryResult<TTransactionHistoryData> => {
	return useQuery({
		queryKey: ["transaction-history", offset, limit],
		queryFn: async () => {
			const { data } = await api.get(`/transaction/history`, {
				params: { offset, limit },
			});

			return data.data;
		},
	});
};
