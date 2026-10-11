import express from 'express';
import { createPharmacyTransaction, getPharmacyTransactions } from '../controllers/pharmacyController.js';

const router = express.Router();

router.post('/transactions', createPharmacyTransaction);
router.get('/transactions', getPharmacyTransactions);

export default router;
