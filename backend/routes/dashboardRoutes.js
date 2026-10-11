import express from 'express';
import {
  getStatistics,
  getPatientStatistics,
  getAppointmentStatistics,
  getRevenueStatistics,
  getDepartmentStatistics,
  getPharmacyStatistics
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/statistics', getStatistics);
router.get('/patient-statistics', getPatientStatistics);
router.get('/appointment-statistics', getAppointmentStatistics);
router.get('/revenue-statistics', getRevenueStatistics);
router.get('/department-statistics', getDepartmentStatistics);
router.get('/pharmacy-statistics', getPharmacyStatistics);

export default router;
