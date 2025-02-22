import express from 'express';
import {deleteUser, getAllUsers, insertUser, specificUser, updateUser} from '../controllers/userController';

const router = express.Router();

router.get('/getallusers', getAllUsers);
router.post('/createuser', insertUser);
router.get('/getspecificuser/?:id', specificUser);
router.delete('/deleteUser/?:id', deleteUser);
router.put('/updateUser/?:id', updateUser);

export default router;
