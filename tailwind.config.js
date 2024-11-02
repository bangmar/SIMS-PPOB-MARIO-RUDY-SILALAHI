/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#f4251b",
				primaryDark: "#b7130a",
				primaryDisabled: "#afafaf",
			},
		},
	},
	plugins: [],
};
