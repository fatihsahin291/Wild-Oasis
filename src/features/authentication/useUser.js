import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import supabase from "../../services/supabase";

export function useUser() {
	const { data: user, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return {
		user,
		isLoading,
		isAuthenticated:
			user?.role === "authenticated",
	};
}
