import express from 'express';
import controllerTest from '../controllers/testController';

const router = express.Router();

router.get('/', controllerTest);

export default router;
