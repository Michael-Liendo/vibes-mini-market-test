import {
	type IFindDatabase,
	type IProduct,
	type IProductQuery,
	ProductSchema,
} from "@vibes/shared";
import { type FilterQuery, model, Schema } from "mongoose";

const productMongooseSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	is_available: { type: Boolean, required: true, default: true },
	category: { type: String, required: true },
	image: { type: String },
});

export const Product = model<IProduct>("Product", productMongooseSchema);

export class ProductRepository {
	static async findAll(
		search: IProductQuery,
		{
			page = 1,
			limit = 10,
		}: {
			page?: number;
			limit?: number;
		},
	): Promise<IFindDatabase<IProduct>> {
		const query: FilterQuery<IProduct> = {};

		if (search.order && search.sort) {
			query.$sort = { [search.sort]: search.order === "asc" ? 1 : -1 };
		}

		if (search.search) {
			const searchRegex = new RegExp(search.search, "i");
			query.$or = [
				{ name: { $regex: searchRegex } },
				{ category: { $regex: searchRegex } },
			];
		}

		if (search.available !== undefined) {
			query.is_available = search.available;
		}

		const count = await Product.countDocuments(query);
		const products = await Product.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.exec();

		return {
			data: ProductSchema.array().parse(products),
			count,
		};
	}

	static async findById(id: string): Promise<IProduct | null> {
		const product = await Product.findById(id);
		return product ? ProductSchema.parse(product.toObject()) : null;
	}
}
