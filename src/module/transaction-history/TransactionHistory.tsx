import { FC, ReactElement } from "react";
import BaseLayout from "../../components/layout/base-layout/BaseLayout";
import Record from "./record/Record";

const TransactionHistoryPage: FC = (): ReactElement => {
	return (
		<BaseLayout>
			<Record />
		</BaseLayout>
	);
};

export default TransactionHistoryPage;
