const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  tag: {
    type: [String], // Update the tag property to be an array of strings
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'], // Use lowercase enum values for priority
    default: 'medium', // Set a default value for priority
  },
  pre_requisites: {
    type: String,
  },
  status: {
    type: String,
    enum: ['done', 'cancelled', 'postponed', 'completed', 'incompleted'],
  },
  due_date: {
    type: Date,
  },
  category: {
    type: String,
    enum: [
      'General',
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
    default: 'General',
  },
  achievedPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  prerequisite_id: {
    type: Number,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
