import { FC, ReactElement } from "react";
import { TButtonProps } from "./types";

const Button: FC<TButtonProps> = ({
	variant,
	children,
	...rest
}): ReactElement => {
	return (
		<>
			<button
				{...rest}
				className={` disabled:bg-primaryDisabled transition-all ease-in-out text-sm duration-150 w-full py-1.5 ${
					variant === "primary"
						? "bg-primary hover:bg-primaryDark text-slate-50"
						: "bg-gray-50 hover:bg-gray-100 disabled:text-gray-100 disabled:border-gray-100 border-primary border-[1px] text-primary"
				}`}>
				{children}
			</button>
		</>
	);
};

export default Button;
