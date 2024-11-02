import { FC, ReactElement } from "react";
import AuthLayout from "../../../components/layout/auth-layout/AuthLayout";
import banner from "../../../assets/auth/auth.png";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { IoMdPerson } from "react-icons/io";
import { useTogglePassword } from "../../../hooks/UseTogglePassword";
import { z } from "zod";
import { registerValidationSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRegister } from "./api";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../../../hooks/useSnackBar";

const RegisterPage: FC = (): ReactElement => {
	const { isToggled, togglePassword } = useTogglePassword();

	const { mutate } = useRegister();
	const navigate = useNavigate();
	const customEnqueueSnackbar = useCustomSnackbar();

	type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
	} = useForm<RegisterValidationSchema>({
		resolver: zodResolver(registerValidationSchema),
		mode: "onChange",
	});

	const registerHandler = handleSubmit((data) => {
		const payload = {
			email: data.email,
			first_name: data.first_name,
			last_name: data.last_name,
			password: data.password,
		};

		mutate(payload, {
			onError: (error) => {
				customEnqueueSnackbar(
					(error?.response?.data?.message as string) || "Terjadi Kesalahan",
					"error"
				);
			},
			onSuccess: (data) => {
				customEnqueueSnackbar(data?.message || "Berhasil Register", "success");
				navigate("/auth/login");
			},
		});
	});

	return (
		<AuthLayout banner={banner} type='register'>
			<form onSubmit={registerHandler} className='flex flex-col gap-4'>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<MdAlternateEmail className='text-gray-400' />
						<input
							required
							type='email'
							placeholder='Masukan email anda'
							{...register("email")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
					</div>
					{errors.email && (
						<p className='text-primary text-xs'>{errors.email.message}</p>
					)}
				</section>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<IoMdPerson className='text-gray-400' />
						<input
							required
							type='text'
							placeholder='Nama depan'
							{...register("first_name")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
					</div>
					{errors.first_name && (
						<p className='text-primary text-xs'>{errors.first_name.message}</p>
					)}
				</section>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<IoMdPerson className='text-gray-400' />
						<input
							required
							type='text'
							placeholder='Nama belakang'
							{...register("last_name")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
					</div>
					{errors.last_name && (
						<p className='text-primary text-xs'>{errors.last_name.message}</p>
					)}
				</section>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<RiLockPasswordLine className='text-gray-400' />
						<input
							required
							type={!isToggled.password ? "password" : "text"}
							placeholder='Masukan password anda'
							{...register("password")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
						<button
							type='button'
							onClick={() => {
								togglePassword("password");
							}}>
							{!isToggled.password ? (
								<FaRegEyeSlash className='text-gray-400' />
							) : (
								<FaRegEye className='text-gray-400' />
							)}
						</button>
					</div>
					{errors.password && (
						<p className='text-primary text-xs'>{errors.password.message}</p>
					)}
				</section>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<RiLockPasswordLine className='text-gray-400' />
						<input
							required
							type={!isToggled.confirm ? "password" : "text"}
							placeholder='Konfirmasi password'
							{...register("confirmPassword")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
						<button
							type='button'
							onClick={() => {
								togglePassword("confirm");
							}}>
							{!isToggled.confirm ? (
								<FaRegEyeSlash className='text-gray-400' />
							) : (
								<FaRegEye className='text-gray-400' />
							)}
						</button>
					</div>
					{errors.confirmPassword && (
						<p className='text-primary text-xs'>
							{errors.confirmPassword.message}
						</p>
					)}
				</section>
				<section className='mt-6'>
					<Button type='submit' variant='primary' disabled={!isValid}>
						Register
					</Button>
				</section>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
