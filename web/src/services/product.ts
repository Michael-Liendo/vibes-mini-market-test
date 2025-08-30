import {
	type IProduct,
	type IProductQuery,
	ProductSchema,
} from '@vibes/shared';
import fetch from '@/utils/fetch';
export class ProductService {
	static async findAll(
		search: IProductQuery,
		{
			page = 1,
			limit = 10,
		}: {
			page?: number;
			limit?: number;
		},
	) {
		const queryParams = new URLSearchParams({
			page: String(page),
			limit: String(limit),
		});

		for (const [key, value] of Object.entries(search)) {
			if (value !== undefined && value !== null && String(value).length > 0) {
				queryParams.append(key, String(value));
			}
		}

		const request = await fetch(`/products?${queryParams.toString()}`);
		if (!request.ok) {
			throw new Error('Failed to fetch products');
		}
		const products = await request.json();
		return {
			data: ProductSchema.array().parse(products.data),
			pagination: products.pagination,
		};
	}

	static async findById(id: string): Promise<IProduct | null> {
		const request = await fetch(`/products/${id}`);

		if (!request.ok) {
			return null;
		}

		const product = await request.json();
		return ProductSchema.parse(product.data);
	}
}
