import type z from 'zod';
import type { ProductQuerySchema, ProductSchema } from '../schema/';

export interface IProduct extends z.infer<typeof ProductSchema> {}
export interface IProductQuery extends z.infer<typeof ProductQuerySchema> {}
