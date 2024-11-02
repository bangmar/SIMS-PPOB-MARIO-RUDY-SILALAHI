import { z } from "zod";

export const updateProfileValidationSchema = z.object({
	email: z.string().email({ message: "Invalid email format" }),
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
});
