import type { IProduct } from "@vibes/shared";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Product } from "./product";

let mongod: MongoMemoryServer | undefined;

export const seedProducts: IProduct[] = [
	{
		_id: "64a7f0c8f1d2c8b1a1a1a101",
		name: "Smartphone Galaxy A12",
		price: 150,
		is_available: true,
		category: "electronics",
		image: "https://picsum.photos/seed/phone1/400/400",
	},
	{
		_id: "64a7f0c8f1d2c8b1a1a1a102",
		name: "Auriculares Bluetooth",
		price: 45,
		is_available: true,
		category: "electronics",
		image: "https://picsum.photos/seed/headphones/400/400",
	},
	{
		_id: "64a7f0c8f1d2c8b1a1a1a103",
		name: "Laptop ProBook 450",
		price: 899,
		is_available: false,
		category: "computers",
		image: "https://picsum.photos/seed/laptop/400/400",
	},
	{
		_id: "64a7f0c8f1d2c8b1a1a1a104",
		name: "Mochila de Viaje",
		price: 35,
		is_available: true,
		category: "accessories",
		image: "https://picsum.photos/seed/backpack/400/400",
	},
	{
		_id: "64a7f0c8f1d2c8b1a1a1a105",
		name: "Zapatillas Running X200",
		price: 60,
		is_available: true,
		category: "shoes",
		image: "https://picsum.photos/seed/shoes/400/400",
	},
	{
		_id: "64a7f0c8f1d2c8b1a1a1a106",
		name: "Camisa Casual Slim Fit",
		price: 25,
		is_available: false,
		category: "clothing",
		image: "https://picsum.photos/seed/shirt/400/400",
	},
];

const seedDatabase = async () => {
	const count = await Product.countDocuments();
	if (count === 0) {
		await Product.insertMany(seedProducts);
		console.log("[DATABASE] Database seeded");
	}
};

export const connect = async () => {
	if (mongod) {
		return;
	}
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();
	console.log(`[DATABASE] Started Local mongo server at ${uri}`);

	await mongoose.connect(uri);
	console.log("[DATABASE] Connected to local MongoDB");

	await seedDatabase();
};

export const disconnect = async () => {
	await mongoose.disconnect();
	if (mongod) {
		await mongod.stop();
		mongod = undefined;
	}
};
