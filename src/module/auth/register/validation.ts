import { z } from "zod";

export const registerValidationSchema = z
	.object({
		email: z.string().email({ message: "Invalid email format" }),
		first_name: z.string().min(1, { message: "First name is required" }),
		last_name: z.string().min(1, { message: "Last name is required" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Confirm password must be at least 8 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
