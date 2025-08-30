import express from 'express';
import { find, findById } from '../controllers/product';

const router = express.Router();

router.get('/', find);
router.get('/:id', findById);

export const products = router;
