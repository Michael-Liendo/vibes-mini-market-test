import type { ProductSchema } from "schema";
import type z from "zod";

export interface IProduct extends z.infer<typeof ProductSchema> {}
