import { FC, ReactElement } from "react";
import { defaultNominal } from "./const";
import { MdPayment } from "react-icons/md";
import Button from "../../../../components/button/Button";
import { z } from "zod";
import { topUpValidationSchema } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTopUp } from "./api";
import useCustomSnackbar from "../../../../hooks/useSnackBar";
import { useBalance } from "../../../balance/api";

const Payment: FC = (): ReactElement => {
	type TopUpValidationSchema = z.infer<typeof topUpValidationSchema>;
	const { mutate } = useTopUp();
	const { refetch } = useBalance();

	const customEnqueueSnackbar = useCustomSnackbar();

	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
		trigger,
		setValue,
		reset,
	} = useForm<TopUpValidationSchema>({
		resolver: zodResolver(topUpValidationSchema),
		mode: "onChange",
		defaultValues: {
			top_up_amount: 0,
		},
	});

	const handleDefaultNominalClick = (amount: number) => {
		setValue("top_up_amount", amount);
		trigger("top_up_amount");
	};

	const topUpHandler = handleSubmit((data) => {
		mutate(data, {
			onError: (error) => {
				customEnqueueSnackbar(
					(error?.response?.data?.message as string) || "Terjadi Kesalahan",
					"error"
				);
			},
			onSuccess: (data) => {
				customEnqueueSnackbar(data?.message || "Berhasil Login", "success");
				refetch();
			},
		});

		reset();
	});

	return (
		<section className='flex flex-col gap-4'>
			<section className='flex flex-col gap-2'>
				<p className='text-gray-500 text-xs md:text-sm'>Silahkan Masukan</p>
				<h1 className='text-gray-800  text-base md:text-lg lg:text-xl font-bold'>
					Nominal Top UP
				</h1>
			</section>

			<form
				onSubmit={topUpHandler}
				className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<section className='col-span-2 flex flex-col gap-4'>
					<section className='bg-white'>
						<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
							<MdPayment className='text-gray-400' />
							<input
								type='number'
								placeholder='Masukan nominal top-up'
								{...register("top_up_amount", { valueAsNumber: true })}
								className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
							/>
						</div>
						{errors.top_up_amount && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.top_up_amount.message}
							</p>
						)}
					</section>

					<Button variant='primary' type='submit' disabled={!isValid}>
						Top Up
					</Button>
				</section>

				<section className='grid grid-cols-3 gap-4'>
					{defaultNominal.map((nominal, index) => (
						<section
							key={index}
							onClick={() => handleDefaultNominalClick(nominal as number)}
							className='bg-gray-50 text-xs lg:text-sm hover:bg-gray-100 transition-all cursor-pointer ease-in-out duration-150 w-full grid place-items-center py-2 border-[1px] border-gray-100'>
							{nominal.toLocaleString("id-ID", {
								style: "currency",
								currency: "IDR",
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							})}
						</section>
					))}
				</section>
			</form>
		</section>
	);
};

export default Payment;
