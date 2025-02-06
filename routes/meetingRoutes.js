import express from 'express';
import {
  getMeetings,
  createMeeting,
  deleteMeeting,
  restoreMeeting,
} from '../controllers/meetingController.js';

const router = express.Router();

router.route('/').get(getMeetings).post(createMeeting);
router.route('/:id').delete(deleteMeeting);
router.route('/restore/:id').post(restoreMeeting);

export default router;