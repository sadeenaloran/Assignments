import express from 'express';

const router = express.Router();
router.get('/', getUser);
router.post('/createUser/:id', createUser);
router.put('/update/:id', upadateUser);
router.delete('/delete/:id', deleteUser);



export default router;