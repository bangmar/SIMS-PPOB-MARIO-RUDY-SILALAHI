// features
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../../../services/api";
import { TServiceData } from "./types";

export const useServices = (): UseQueryResult<TServiceData[]> => {
	return useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const { data } = await api.get("/services");
			return data.data;
		},
	});
};
