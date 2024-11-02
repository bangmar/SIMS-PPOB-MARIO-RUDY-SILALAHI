// hooks/useSnackbar.ts
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { showSnackbar } from "../store/snackbar-scice/SnackBarSlice";

const useCustomSnackbar = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const customEnqueueSnackbar = (
		message: string,
		variant: "success" | "error" | "info" | "warning"
	) => {
		enqueueSnackbar(message, {
			variant,
			onClose: () => {
				dispatch(
					showSnackbar({
						message: "",
						variant: undefined,
					})
				);
			},
			autoHideDuration: 1500,
			anchorOrigin: {
				vertical: "top",
				horizontal: "right",
			},
		});
	};

	return customEnqueueSnackbar;
};

export default useCustomSnackbar;
