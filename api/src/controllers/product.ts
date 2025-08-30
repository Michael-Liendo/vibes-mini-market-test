import type { TOrder } from '@vibes/shared';
import type { Request, Response } from 'express';
import Services from '../services';

export async function find(req: Request, res: Response) {
	const { page, limit, search, available, sort, order } = req.query as {
		search?: string;
		available?: boolean;
		page?: number;
		limit?: number;
		sort?: string;
		order?: TOrder;
	};

	const { data, pagination } = await Services.product.findAll(
		{ search, available, sort, order },
		{ page, limit },
	);

	res.json({ message: 'List of products', data, pagination });
}

export async function findById(req: Request, res: Response) {
	const { id } = req.params;
	const product = await Services.product.findById(id);

	if (product) {
		res.json({ message: `Product details for ID: ${id}`, data: product });
	} else {
		res.status(404).json({ message: `Product not found for ID: ${id}` });
	}
}
