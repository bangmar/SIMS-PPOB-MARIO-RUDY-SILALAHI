import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./module/auth/login/Login.tsx";
import RegisterPage from "./module/auth/register/Register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import TopUpPage from "./module/top-up/TopUp.tsx";
import TransactionHistory from "./module/transaction-history/TransactionHistory.tsx";
import AccountPage from "./module/account/Account.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
	{
		path: "/auth/register",
		element: <RegisterPage />,
	},
	{
		path: "/top-up",
		element: <TopUpPage />,
	},
	{
		path: "/transaction",
		element: <TransactionHistory />,
	},
	{
		path: "/account",
		element: <AccountPage />,
	},
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<SnackbarProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</SnackbarProvider>
		</Provider>
	</StrictMode>
);
