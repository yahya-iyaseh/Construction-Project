const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/Notification.Controller');

// Send a notification to a specific user
router.post(
  '/send-notification/user',
  notificationController.sendNotificationToUser
);

// Send a notification to all users
router.post(
  '/send-notification/all',
  notificationController.sendNotificationToAllUsers
);

// Send task reminder notifications to users
// router.post('/send-task-reminders', notificationController.sendTaskReminders);

module.exports = router;
