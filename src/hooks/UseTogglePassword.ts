import { useState } from "react";

export const useTogglePassword = () => {
	const [isToggled, setToggled] = useState<{
		password: boolean;
		confirm: boolean;
	}>({
		password: false,
		confirm: false,
	});

	const togglePassword = (type: "password" | "confirm") => {
		setToggled((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	return { isToggled, togglePassword };
};
