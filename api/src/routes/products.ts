import express from "express";
import { find } from "../controllers/product";

const router = express.Router();

router.get("/", find);
router.get("/:id", find);

export const products = router;
