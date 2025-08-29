import type { IProduct } from "@vibes/shared";
import Repository from "../repository";

export class ProductService {
	static async findAll(): Promise<IProduct[]> {
		const products = await Repository.product.findAll();

		return products;
	}

	static async findById(id: string): Promise<IProduct | null> {
		const product = await Repository.product.findById(id);
		return product;
	}
}
