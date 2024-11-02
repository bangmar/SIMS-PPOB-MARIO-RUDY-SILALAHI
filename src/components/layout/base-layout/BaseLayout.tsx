import { FC, ReactElement } from "react";
import Navbar from "../../navbar/Navbar";
import { TBaseLayoutProps } from "./types";
import balanceBanner from "../../../assets/home/balance.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useProfile } from "../../../module/profile/api";
import Avatar from "react-avatar";
import { useBalance } from "../../../module/balance/api";
import { useToggleBalance } from "../../../hooks/useToggleBalance";
import { defaultImageUrl } from "../../../services/const";

const BaseLayout: FC<TBaseLayoutProps> = ({ children }): ReactElement => {
	const { data: profile } = useProfile();
	const { data: balance } = useBalance();
	const { isBalanceVisible, toggleBalance } = useToggleBalance();

	return (
		<>
			<Navbar />
			<section className='px-4 md:px-12 lg:px-20 py-10 flex flex-col gap-8 md:gap-10 lg:gap-14'>
				<section className=' flex flex-wrap md:flex-nowrap justify-between items-center gap-4'>
					<section className='flex flex-row items-center flex-wrap md:flex-col md:items-start w-full md:min-w-[40%] md:max-w-[40%] gap-x-4 gap-y-3 md:gap-3 lg:gap-4'>
						<section className='h-14 w-14 rounded-full overflow-hidden bg-gray-200'>
							{profile?.profile_image &&
							profile?.profile_image !== defaultImageUrl ? (
								<img
									src={profile?.profile_image}
									alt={`${profile?.first_name} ${profile?.last_name}`}
									className='h-full w-full rounded-full object-cover'
								/>
							) : (
								<Avatar
									className='h-full w-full rounded-full object-cover'
									size='100%'
									color='#f4251b'
									alt='user-icon'
									name={`${profile?.first_name || ""} ${
										profile?.last_name || ""
									}`}
								/>
							)}
						</section>
						<section className='flex flex-col '>
							<p className='text-gray-600 text-xs'> Selamat Datang,</p>
							<h1 className='text-gray-800 font-semibold text-base md:text-lg'>
								{profile?.first_name || ""} {profile?.last_name || ""}
							</h1>
						</section>
					</section>
					<section
						className='bg-cover bg-center md:bg-top w-full rounded-md shadow-md flex flex-col gap-1 py-4 md:py-6 px-4 md:px-6 text-gray-200'
						style={{ backgroundImage: `url(${balanceBanner})` }}>
						<p className='text-xs md:text-sm'>Saldo anda</p>
						<h1 className='font-bold text-lg md:text-xl'>
							{isBalanceVisible
								? balance?.balance.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
								  })
								: "******"}
						</h1>
						<button
							type='button'
							onClick={toggleBalance}
							className='flex gap-2 items-center text-xs'>
							<p>{isBalanceVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}</p>
							{isBalanceVisible ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</section>
				</section>
				{children}
			</section>
		</>
	);
};

export default BaseLayout;
