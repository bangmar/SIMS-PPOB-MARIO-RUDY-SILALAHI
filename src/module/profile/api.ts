import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TProfileData } from "./types";
import api from "../../services/api";

export const useProfile = (): UseQueryResult<TProfileData> => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data } = await api.get("/profile");

			return data.data;
		},
	});
};
