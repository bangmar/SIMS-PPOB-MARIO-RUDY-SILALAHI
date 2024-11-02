// Services.tsx
import { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useServices } from "./api";
import { TServiceData } from "./types";
import { setSelectedService } from "../../../../store/service-slice/ServiceSlice";

const Services: FC = (): ReactElement => {
	const { data } = useServices();
	const dispatch = useDispatch();

	const handleServiceClick = (service: TServiceData) => {
		dispatch(setSelectedService(service));
	};

	return (
		<section className='flex flex-wrap md:flex-nowrap justify-start md:justify-between gap-4 w-full overflow-x-scroll no-scrollbar'>
			{data?.map((service, index) => (
				<section
					key={index}
					onClick={() => handleServiceClick(service)}
					className='md:w-20 gap-2 items-center flex flex-col cursor-pointer flex-shrink-0'>
					<section className='h-12 lg:h-14 w-12 lg:w-14 bg-purple-50'>
						<img
							src={service.service_icon}
							alt={`${service.service_code}-icon`}
							className='w-full h-full object-cover object-center'
						/>
					</section>
					<p className='hidden md:block text-center text-[10px] md:text-xs text-gray-500 font-medium'>
						{service.service_name}
					</p>
				</section>
			))}
		</section>
	);
};

export default Services;
