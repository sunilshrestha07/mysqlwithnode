import express from 'express';
import {deleteSpecificProduct, getAllProducts, getSpecificProduct} from '../controllers/productController';

const router = express.Router();

router.get('/getAllProducts', getAllProducts);
router.get('/specificProduct/?:id', getSpecificProduct);
router.delete('/specificProduct/?:id', deleteSpecificProduct);

export default router;
