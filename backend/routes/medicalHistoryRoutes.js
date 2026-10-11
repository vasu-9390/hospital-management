import express from 'express';
import { getMedicalHistoryById, createMedicalHistory, updateMedicalHistory, deleteMedicalHistory } from '../controllers/medicalHistoryController.js';

const router = express.Router();

router.post('/', createMedicalHistory);
router.get('/:id', getMedicalHistoryById);
router.put('/:id', updateMedicalHistory);
router.delete('/:id', deleteMedicalHistory);

export default router;
