import express from 'express';
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import { getPatientMedicalHistory } from '../controllers/medicalHistoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

// Nested patient medical history
router.get('/:id/medical-history', getPatientMedicalHistory);

export default router;
