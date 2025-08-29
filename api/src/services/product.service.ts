import type { IProduct, IProductQuery, ISReplyFindAll } from "@vibes/shared";
import Repository from "../repository";

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
	): Promise<ISReplyFindAll<IProduct>> {
		const { count, data } = await Repository.product.findAll(search, {
			page,
			limit,
		});

		return {
			data: data,
			pagination: {
				page,
				limit,
				total: count,
				total_pages: Math.ceil(count / limit),
			},
		};
	}

	static async findById(id: string): Promise<IProduct | null> {
		const product = await Repository.product.findById(id);
		return product;
	}
}
