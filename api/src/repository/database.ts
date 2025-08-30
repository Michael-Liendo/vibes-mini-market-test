import { faker } from '@faker-js/faker';
import type { IProduct } from '@vibes/shared';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Product } from './product';

let mongod: MongoMemoryServer | undefined;

function createRandomProduct(): Omit<IProduct, '_id'> {
	return {
		name: faker.commerce.productName(),
		price: parseFloat(faker.commerce.price()),
		is_available: faker.datatype.boolean(),
		category: faker.commerce.department(),
		image: faker.image.url({ width: 400, height: 400 }),
	};
}

const seedProducts = faker.helpers.multiple(createRandomProduct, { count: 50 });

const seedDatabase = async () => {
	const count = await Product.countDocuments();
	if (count === 0) {
		await Product.insertMany(seedProducts);
		console.log(`[DATABASE] seeded with ${seedProducts.length} products`);
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
	console.log('[DATABASE] Connected to local MongoDB');

	await seedDatabase();
};

export const disconnect = async () => {
	await mongoose.disconnect();
	if (mongod) {
		await mongod.stop();
		mongod = undefined;
	}
};
