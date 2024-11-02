import { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedService } from "../../../../store/service-slice/ServiceSlice";
import { TServiceData } from "../services/types";
import { MdPayment } from "react-icons/md";
import Button from "../../../../components/button/Button";
import { usePayService } from "./api";
import useCustomSnackbar from "../../../../hooks/useSnackBar";

const PayService: FC<TServiceData> = ({
	service_code,
	service_icon,
	service_name,
	service_tariff,
}): ReactElement => {
	const customEnqueueSnackbar = useCustomSnackbar();

	const dispatch = useDispatch();

	const handleClearSelection = () => {
		dispatch(clearSelectedService());
	};

	const { mutate } = usePayService();
	const handlePay = () => {
		mutate(
			{ service_code },
			{
				onError: (error) => {
					customEnqueueSnackbar(
						(error?.response?.data?.message as string) || "Terjadi Kesalahan",
						"error"
					);
				},
				onSuccess: (data) => {
					customEnqueueSnackbar(data?.message || "Berhasil Login", "success");
					handleClearSelection();
				},
			}
		);
	};

	return (
		<section className='flex flex-col gap-4'>
			<section className='flex flex-col gap-2'>
				<p className='text-gray-500 text-xs md:text-sm'>Pembayaran</p>
				<section className='flex flex-wrap items-center gap-4'>
					<span className='h-10 w-10 bg-gray-100'>
						<img
							src={service_icon}
							alt={service_code}
							className='w-full h-full object-cover object-center'
						/>
					</span>
					<h1 className='text-gray-800 text-base md:text-lg lg:text-xl font-bold'>
						{service_name}
					</h1>
				</section>
			</section>
			<section className='col-span-2 flex flex-col gap-4'>
				<section className='bg-white'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<MdPayment className='text-gray-400' />
						<section className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'>
							{service_tariff}
						</section>
					</div>
				</section>

				<section className='flex flex-col gap-2 md:gap-4'>
					<Button variant='primary' type='submit' onClick={handlePay}>
						Bayar
					</Button>
					<Button
						variant='secondary'
						type='reset'
						onClick={handleClearSelection}>
						Batal
					</Button>
				</section>
			</section>
		</section>
	);
};

export default PayService;
