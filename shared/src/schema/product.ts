import z from "zod";

export const ProductSchema = z.object({
	_id: z.coerce.string(),
	name: z.string(),
	price: z.number().nonnegative(),
	is_available: z.boolean().default(true),
	category: z.string(),
	image: z.url().optional(),
});
