export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long", // Full month name
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false, // 24-hour format
	};

	const formatter = new Intl.DateTimeFormat("id-ID", options);

	const formattedDate = formatter.format(date);

	return formattedDate.replace(/pukul /, "");
};
