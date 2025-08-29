import z from "zod";

const TOrder = z.enum(["asc", "desc"]);
const _TSort = z.enum(["name", "price", "category"]);

export const ProductSchema = z.object({
	_id: z.coerce.string(),
	name: z.string(),
	price: z.number().nonnegative(),
	is_available: z.boolean().default(true),
	category: z.string(),
	image: z.url().optional(),
});

export const ProductQuerySchema = z.object({
	search: z.string().min(2).max(100).optional(),
	available: z.boolean().optional(),
	sort: z.string().optional(),
	order: TOrder.optional(),
});
