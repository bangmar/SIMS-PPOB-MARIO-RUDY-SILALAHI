import { FC, ReactElement } from "react";
import { usePromos } from "./api";

const Promo: FC = (): ReactElement => {
	const { data } = usePromos();
	return (
		<section className='flex flex-col gap-4'>
			<h1 className='text-sm md:text-base text-gray-800 font-medium'>
				Temukan Promo Menarik
			</h1>
			<section className='w-full no-scrollbar flex justify-between gap-10 overflow-x-scroll'>
				{data?.map((promo, index) => {
					return (
						<section
							key={index}
							className='bg-red-50 w-full md:w-96  flex-shrink-0'>
							<img
								src={promo.banner_image}
								alt={`${promo.banner_name}-banner`}
								className='w-full h-full object-cover object-center'
							/>
						</section>
					);
				})}
			</section>
		</section>
	);
};

export default Promo;
