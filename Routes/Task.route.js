const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/Task.Controller');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createNewTask);
router.get('/:id', taskController.findTaskById);
router.put('/:id', taskController.updateATask);
router.delete('/:id', taskController.deleteATask);
router.get('/filter', taskController.filterTasks);
router.post('/priority', taskController.setTaskPriority);
router.post('/due-date', taskController.setTaskDueDate);
router.post('/assign-category', taskController.assignTaskToCategory);
router.post('/set-reminder', taskController.setTaskReminder);
router.post('/set-prerequisite', taskController.setTaskPrerequisite);
router.post('/mark-completed', taskController.markTaskCompleted);
router.post('/mark-incomplete', taskController.markTaskIncomplete);
router.get('/search', taskController.searchTasks);
router.post('/send-notification', taskController.sendNotificationToUsers);

module.exports = router;
