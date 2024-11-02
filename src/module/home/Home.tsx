import { FC, ReactElement } from "react";

import BaseLayout from "../../components/layout/base-layout/BaseLayout";
import Services from "./section/services/Services";
import Promo from "./section/promo/Promo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PayService from "./section/pay-service/PayService";

const HomePage: FC = (): ReactElement => {
	const selectedService = useSelector(
		(state: RootState) => state.service.selectedService
	);

	return (
		<BaseLayout>
			{selectedService ? (
				<PayService
					service_code={selectedService.service_code}
					service_icon={selectedService.service_icon}
					service_name={selectedService.service_name}
					service_tariff={selectedService.service_tariff}
				/>
			) : (
				<>
					<Services />
					<Promo />
				</>
			)}
		</BaseLayout>
	);
};

export default HomePage;
