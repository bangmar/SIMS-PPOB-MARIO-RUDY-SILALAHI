import { FC, ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransactionHistory } from "./api";
import { formatDate } from "../../../services/formatDate";
import { RootState } from "../../../store/store";
import {
	addTransactions,
	setOffset,
	setTransactions,
} from "../../../store/transaction-history-slice/TransactionHistoySlice";

const Record: FC = (): ReactElement => {
	const dispatch = useDispatch();
	const { records, offset, limit } = useSelector(
		(state: RootState) => state.transactions
	);
	const { data } = useTransactionHistory(offset, limit);

	useEffect(() => {
		if (data?.records.length) {
			if (offset === 0) {
				dispatch(setTransactions(data.records));
			} else {
				dispatch(addTransactions(data.records));
			}
		}
	}, [data, dispatch, offset]);

	const handleShowMore = () => {
		dispatch(setOffset(offset + limit));
	};

	return (
		<section className='flex flex-col gap-4'>
			<section className='flex flex-col gap-1'>
				<p className='text-gray-800 font-semibold text-sm'>Semua Transaksi</p>
			</section>
			<section className='flex flex-col gap-4'>
				{records.map((record) => (
					<section
						key={record.invoice_number}
						className='border-[1px] border-gray-200 flex items-center justify-between px-6 py-4'>
						<section className='flex flex-col gap-1'>
							<p
								className={`flex items-center gap-2 ${
									record.transaction_type === "TOPUP"
										? "text-[#81b6a6]"
										: "text-primaryDark"
								} text-sm font-semibold`}>
								<span>{record.transaction_type === "TOPUP" ? "+" : "-"}</span>
								<span>
									{record.total_amount.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									})}
								</span>
							</p>
							<p className='text-gray-400 text-xs'>
								{formatDate(record.created_on || "")}
							</p>
						</section>
						<p className='text-xs text-gray-500'>{record.description || "-"}</p>
					</section>
				))}
			</section>
			{data?.records.length === limit && (
				<button
					onClick={handleShowMore}
					className='text-xs text-primary hover:text-primaryDark transition-all ease-in-out duration-200'>
					Show More
				</button>
			)}
		</section>
	);
};

export default Record;
