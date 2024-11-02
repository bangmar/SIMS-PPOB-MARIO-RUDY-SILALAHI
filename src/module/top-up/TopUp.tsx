import { FC, ReactElement } from "react";
import BaseLayout from "../../components/layout/base-layout/BaseLayout";
import Payment from "./section/payment/Payment";

const TopUpPage: FC = (): ReactElement => {
	return (
		<BaseLayout>
			<Payment />
		</BaseLayout>
	);
};

export default TopUpPage;
