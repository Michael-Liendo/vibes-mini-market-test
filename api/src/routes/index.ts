import express from "express";
import { products } from "./products";

const router = express.Router();

router.get("/", (_, res) => {
	res.json("API is running");
});

router.use("/products", products);

export const routes = router;
