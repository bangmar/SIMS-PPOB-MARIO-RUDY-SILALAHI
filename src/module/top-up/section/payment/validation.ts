import { z } from "zod";

export const topUpValidationSchema = z.object({
	top_up_amount: z
		.number({ required_error: "Please enter nominal" })
		.int()
		.positive("Amount must be a positive number")
		.min(10000, "Amount must be at least 10,000")
		.max(1000000, "Amount must be at most 1,000,000"),
});
