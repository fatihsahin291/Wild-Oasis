import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();

	const { mutate: login, isLoading } =
		useMutation({
			mutationFn: ({ email, password }) =>
				loginAPI({ email, password }),
			onSuccess: (user) => {
				navigate("/dashboard");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	return { login, isLoading };
}
