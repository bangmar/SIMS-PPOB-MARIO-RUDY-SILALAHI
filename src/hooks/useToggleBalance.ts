import { useState } from "react";

export const useToggleBalance = () => {
	const [isBalanceVisible, setIsBalanceVisible] = useState(false);

	const toggleBalance = () => {
		setIsBalanceVisible((prev) => !prev);
	};

	return { isBalanceVisible, toggleBalance };
};
