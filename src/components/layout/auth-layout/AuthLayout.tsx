import { FC } from "react";
import { TAuthLayoutProps } from "./types";
import logo from "../../../assets/icon/logo.png";
import { Link } from "react-router-dom";

const AuthLayout: FC<TAuthLayoutProps> = ({ banner, children, type }) => {
	return (
		<main className='grid grid-cols-1  gap-10 md:grid-cols-2 min-h-[100vh] text-gray-600'>
			<section className=' py-0 md:py-10 lg:py-20 order-2 md:order-1 flex justify-center items-center '>
				<section className='flex flex-col gap-8  bg-white rounded-md shadow-sm w-full md:min-w-[420px] md:max-w-[450px] h-fit px-8 py-10'>
					<header className='flex flex-col justify-center items-center gap-4'>
						<section className='flex gap-2 items-center'>
							<section className='h-7 w-7'>
								<img
									src={logo}
									alt='logo'
									className='h-full w-full object-cover object-center'
								/>
							</section>
							<h1 className='font-medium text-base md:text-lg text-center'>
								SIMS PPOB
							</h1>
						</section>
						<section>
							<h1 className='font-semibold text-xl md:text-2xl  text-center'>
								{type === "register"
									? "Lengkapi data untuk membuat akun"
									: "Masuk atau buat akun untuk memulai"}
							</h1>
						</section>
					</header>
					<section>{children}</section>
					<section className='flex justify-center items-center text-xs md:text-sm text-gray-500 text-center'>
						{type === "login" ? (
							<p>
								belum punya akun ? registrasi{" "}
								<Link
									className='text-primary font-medium'
									to={"/auth/register"}>
									di sini
								</Link>
							</p>
						) : (
							<p>
								sudah punya akun ? login{" "}
								<Link className='text-primary font-medium' to={"/auth/login"}>
									di sini
								</Link>
							</p>
						)}
					</section>
				</section>
			</section>
			<section className='h-[30vh] md:h-[100vh] sticky top-0  w-full order-1 md:order-2'>
				<img
					src={banner}
					alt='banner-auth'
					className='w-full h-full object-cover object-top'
				/>
			</section>
		</main>
	);
};

export default AuthLayout;
