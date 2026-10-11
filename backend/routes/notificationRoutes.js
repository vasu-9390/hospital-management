import express from 'express';
import { getNotifications, markNotificationRead, deleteNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.put('/:id/read', markNotificationRead);
router.delete('/:id', deleteNotification);

export default router;
