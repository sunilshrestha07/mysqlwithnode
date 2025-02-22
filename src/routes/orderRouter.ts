import express from 'express';
import {getAllInfo, getAllOrders, insetOrder} from '../controllers/orderController';

const router = express.Router();

router.get('/getallorders', getAllOrders);
router.post('/insertorder', insetOrder);
router.get('/getAllInfo', getAllInfo);

export default router;
