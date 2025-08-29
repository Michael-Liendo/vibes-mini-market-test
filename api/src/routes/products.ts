import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
	res.send("Products endpoint is working");
});

export const products = router;
