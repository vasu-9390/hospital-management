import express from 'express';
import { getMedicalReports, getMedicalReportById, createMedicalReport, updateMedicalReport, deleteMedicalReport } from '../controllers/medicalReportController.js';

const router = express.Router();

router.get('/', getMedicalReports);
router.get('/:id', getMedicalReportById);
router.post('/', createMedicalReport);
router.put('/:id', updateMedicalReport);
router.delete('/:id', deleteMedicalReport);

export default router;
