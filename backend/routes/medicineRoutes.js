import express from 'express';
import { getMedicines, getMedicineById, createMedicine, updateMedicine, deleteMedicine, getLowStockMedicines } from '../controllers/pharmacyController.js';

const router = express.Router();

router.get('/low-stock', getLowStockMedicines);
router.get('/', getMedicines);
router.get('/:id', getMedicineById);
router.post('/', createMedicine);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
