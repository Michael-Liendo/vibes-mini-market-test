import type { IProduct } from "@vibes/shared";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Product } from "./product";

let mongod: MongoMemoryServer | undefined;

const seedProducts: IProduct[] = [
	{
		name: "phone 1",
		price: 10,
		is_available: true,
		category: "electronics",
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
	console.log("[DATABASE] Connected to local MongoDB.");

	await seedDatabase();
};

export const disconnect = async () => {
	await mongoose.disconnect();
	if (mongod) {
		await mongod.stop();
		mongod = undefined;
	}
};
