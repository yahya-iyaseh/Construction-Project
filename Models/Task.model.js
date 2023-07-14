const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  pre_requisties: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['done', 'cancelled', 'postopned', 'completed', 'incompleted'],
  },
  due_date: {
    type: Date,
    required: false,
  },
  category: {
    type: String,
    enum: [
      'Personal',
      'Work',
      'Education',
      'Fitness',
      'Finance',
      'Home',
      'Hobbies',
      'Travel',
      'Projects',
      'Social',
    ],
  },
  user_id: {
    type: Number,
    required: true,
  },
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
