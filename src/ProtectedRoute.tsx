import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { FC, ReactElement } from "react";

const ProtectedRoute: FC = (): ReactElement => {
	const token = Cookies.get("SIMS-PPOB-MARIO");

	if (!token) {
		return <Navigate to='/auth/login' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
