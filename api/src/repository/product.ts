import { ProductSchema, type IProduct } from "@vibes/shared";
import { model, Schema } from "mongoose";

const productMongooseSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	is_available: { type: Boolean, required: true, default: true },
	category: { type: String, required: true },
	image: { type: String },
});

export const Product = model<IProduct>("Product", productMongooseSchema);

export class ProductRepository {
	static async findAll(): Promise<IProduct[]> {
		const products = await Product.find({});
		return ProductSchema.array().parse(products.map((p) => p.toObject()));
	}

	static async findById(id: string): Promise<IProduct | null> {
		const product = await Product.findById(id);
		return product ? ProductSchema.parse(product.toObject()) : null;
	}
}
