const createError = require('http-errors');
const webPush = require('web-push');
const Task = require('../Models/Task');
const User = require('../Models/User');

//storing the keys in variables
const publicVapidKey =
  'BOZQTkrPtIOqg8QmEh1ld_dPJDsNZI3YpuSfJZvP4UTKw325ekUFB_dX3gJBN5wz-TZo8KADFZj3ssR9y9SIx9Q';
const privateVapidKey = 'BPQ0OVLojBv63Ks5O1IEfoTFYcMuzEcBXMjADGkIfa8';

// Configure web-push with your VAPID keys
webPush.setVapidDetails(
  'mailto:someyahya@gmail.com',
  publicVapidKey,
  privateVapidKey
);

module.exports = {
  // Other functions...

  // Send a notification to a specific user
  sendNotificationToUser: async (req, res, next) => {
    const { userId, notification } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw createError(404, 'User does not exist.');
      }

      const payload = JSON.stringify(notification);

      await webPush.sendNotification(user.notificationToken, payload);
      res.send('Notification sent successfully');
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  // Send a notification to all users
  sendNotificationToAllUsers: async (req, res, next) => {
    const { notification } = req.body;

    try {
      const users = await User.find();

      if (users.length === 0) {
        throw createError(404, 'No users found.');
      }

      const payload = JSON.stringify(notification);

      await Promise.all(
        users.map(async (user) => {
          if (user.notificationToken) {
            await webPush.sendNotification(user.notificationToken, payload);
          }
        })
      );

      res.send('Notification sent successfully to all users');
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  // Send task reminder notifications to users
  // sendTaskReminders: async () => {
  //   try {
  //     const currentDate = new Date();

  //     const tasks = await Task.find({
  //       dueDate: { $gte: currentDate },
  //     }).populate('assignedUser');

  //     tasks.forEach(async (task) => {
  //       const { assignedUser, dueDate } = task;

  //       if (assignedUser && assignedUser.notificationToken) {
  //         const reminder = {
  //           title: 'Task Reminder',
  //           body: `The task "${task.name}" is approaching its deadline (${dueDate}).`,
  //         };

  //         const payload = JSON.stringify(reminder);

  //         await webPush.sendNotification(
  //           assignedUser.notificationToken,
  //           payload
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     console.log('Error sending task reminders:', error);
  //   }
  // },
};
