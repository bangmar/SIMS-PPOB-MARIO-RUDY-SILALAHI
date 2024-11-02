import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../services/api";
import { TBalanceData } from "./types";

export const useBalance = (): UseQueryResult<TBalanceData> => {
	return useQuery({
		queryKey: ["balance"],
		queryFn: async () => {
			const { data } = await api.get("/balance");

			return data.data;
		},
	});
};
