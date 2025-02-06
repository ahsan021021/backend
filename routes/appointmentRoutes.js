import express from 'express';
import {
  create as createAppointment,
  list as getAllAppointments,
  update as updateAppointment,
  remove as deleteAppointment,
  getAppointment
} from '../controllers/appointmentController.js'; // Adjust path as needed

const router = express.Router();

router.post('/', createAppointment);
router.get('/:id', getAppointment);
router.get('/', getAllAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;