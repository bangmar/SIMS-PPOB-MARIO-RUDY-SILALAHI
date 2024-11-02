import { ReactNode } from "react";

export type TAuthLayoutProps = {
	children: ReactNode;
	banner: string;
	type: "login" | "register";
};
