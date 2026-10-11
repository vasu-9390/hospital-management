import express from 'express';
import { getBills, getBillById, createBill, updateBill } from '../controllers/billingController.js';

const router = express.Router();

router.get('/', getBills);
router.get('/:id', getBillById);
router.post('/', createBill);
router.put('/:id', updateBill);

export default router;
