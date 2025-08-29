import type { Request, Response } from "express";
import Services from "../services";

export async function find(_: Request, res: Response) {
	const products = await Services.product.findAll();

	res.json({ message: "List of products", data: products });
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
