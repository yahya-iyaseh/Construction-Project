const createError = require('http-errors');
const mongoose = require('mongoose');

const Task = require('../Models/Task.model');

module.exports = {
  getAllTasks: async (req, res, next) => {
    try {
      const results = await Task.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  createNewTask: async (req, res, next) => {
    try {
      const task = new Task(req.body);
      const result = await task.save();
      res.send({
        status: 'true',
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findTaskById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Task does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Task Id'));
      }
      next(error);
    }
  },

  deleteATask: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Task.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  filterTasks: async (req, res, next) => {
    const { priority, deadline, user, status } = req.query;
    try {
      const filters = {};
      if (priority) filters.priority = priority;
      if (deadline) filters.deadline = deadline;
      if (user) filters.user = user;
      if (status) filters.status = status;

      const results = await Task.find(filters, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  setTaskPriority: async (req, res, next) => {
    const { id, priority } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.priority = priority;
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  setTaskDueDate: async (req, res, next) => {
    const { id, dueDate } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.dueDate = dueDate;
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  assignTaskToCategory: async (req, res, next) => {
    const { id, category } = req.body;

    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.category = category;
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  setTaskReminder: async (req, res, next) => {
    const { id, reminder } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.reminder = reminder;
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },
  setTaskPrerequisite: async (req, res, next) => {
    const { taskId, prerequisite_id } = req.body;

    try {
      const task = await Task.findById(taskId);
      const prerequisite = await Task.findById(prerequisite_id);

      if (!task) {
        throw createError(404, 'Task does not exist.');
      }

      if (!prerequisite) {
        throw createError(404, 'Prerequisite task does not exist.');
      }

      task.prerequisite = prerequisite_id;

      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task or Prerequisite Task ID'));
        return;
      }
      next(error);
    }
  },
  markTaskCompleted: async (req, res, next) => {
    const { id } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.status = 'completed';
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  markTaskIncomplete: async (req, res, next) => {
    const { id, achievedPercentage } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      task.completed = 'incompleted';
      task.achievedPercentage = achievedPercentage || 0;
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

  searchTasks: async (req, res, next) => {
    const { query } = req.query;
    try {
      const results = await Task.find(
        { $text: { $search: query } },
        { __v: 0 }
      );
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  sendNotificationToUsers: async (req, res, next) => {
    const { notification } = req.body;
    try {
      // Code to send notifications to all users
      res.send('Notifications sent successfully');
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
