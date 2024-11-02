import { FC, ReactElement } from "react";
import AuthLayout from "../../../components/layout/auth-layout/AuthLayout";
import banner from "../../../assets/auth/auth.png";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { loginValidationSchema } from "./validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "./api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../../../hooks/useSnackBar";
import { useTogglePassword } from "../../../hooks/UseTogglePassword";

const LoginPage: FC = (): ReactElement => {
	const { isToggled, togglePassword } = useTogglePassword();

	const { mutate } = useLogin();
	const customEnqueueSnackbar = useCustomSnackbar();
	const navigate = useNavigate();

	type LoginValidationSchema = z.infer<typeof loginValidationSchema>;
	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
	} = useForm<LoginValidationSchema>({
		resolver: zodResolver(loginValidationSchema),
		mode: "onChange",
	});

	const loginHandler = handleSubmit((data) => {
		mutate(data, {
			onError: (error) => {
				customEnqueueSnackbar(
					(error?.response?.data?.message as string) || "Terjadi Kesalahan",
					"error"
				);
			},
			onSuccess: (data) => {
				customEnqueueSnackbar(data?.message || "Berhasil Login", "success");

				const token = data?.data?.token;
				Cookies.set("SIMS-PPOB-MARIO", token, {
					expires: 1,
					path: "/",
				});
				navigate("/");
			},
		});
	});

	return (
		<AuthLayout banner={banner} type='login'>
			<form onSubmit={loginHandler} className='flex flex-col gap-4'>
				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<MdAlternateEmail className='text-gray-400' />
						<input
							type='email'
							placeholder='Masukan email anda'
							{...register("email")}
							className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
						/>
					</div>
					{errors.email && (
						<p className='text-red-500 text-xs'>{errors.email.message}</p>
					)}
				</section>

				<section className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
						<RiLockPasswordLine className='text-gray-400' />
						<input
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
						<p className='text-red-500 text-xs'>{errors.password.message}</p>
					)}
				</section>

				<section className='mt-6'>
					<Button variant='primary' type='submit' disabled={!isValid}>
						Masuk
					</Button>
				</section>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
