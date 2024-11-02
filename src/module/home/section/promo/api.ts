// features
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../../../services/api";
import { TPromoData } from "./types";

export const usePromos = (): UseQueryResult<TPromoData[]> => {
	return useQuery({
		queryKey: ["promos"],
		queryFn: async () => {
			const { data } = await api.get("/banner");
			return data.data;
		},
	});
};
