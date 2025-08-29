import type { ProductQuerySchema, ProductSchema } from "../schema/";
import type z from "zod";

export interface IProduct extends z.infer<typeof ProductSchema> {}
export interface IProductQuery extends z.infer<typeof ProductQuerySchema> {}
