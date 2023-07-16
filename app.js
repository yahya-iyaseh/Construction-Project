const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const User = require('./Models/User');
const Task = require('./Models/Task');

var faker = require('faker');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// async function insertTasksForUsers() {
//   try {
//     const users = await User.find({}); // Fetch all users from the User model

//     for (const user of users) {
//       const tasks = [];

//       for (let i = 0; i < 100; i++) {
//         const task = new Task({
//           code: faker.datatype.uuid(),
//           name: faker.random.words(),
//           description: faker.lorem.sentences(),
//           tag: faker.random.word(),
//           priority: faker.random.arrayElement(['High', 'Medium', 'Low']),
//           pre_requisties: faker.random.word(),
//           status: faker.random.arrayElement([
//             'done',
//             'cancelled',
//             'postopned',
//             'completed',
//             'incompleted',
//           ]),
//           due_date: faker.date.future(),
//           category: faker.random.arrayElement([
//             'General',
//             'Personal',
//             'Work',
//             'Education',
//             'Fitness',
//             'Finance',
//             'Home',
//             'Hobbies',
//             'Travel',
//             'Projects',
//             'Social',
//           ]),
//           achievedPercentage: faker.datatype.number({ min: 0, max: 100 }),
//           prerequisite_id: faker.datatype.number(),
//           user_id: user._id,
//         });

//         tasks.push(task);
//         console.log(task);
//       }

//       await Task.insertMany(tasks); // Insert the tasks for the current user
//     }

//     console.log('Tasks inserted successfully.');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error inserting tasks:', error);
//   }
// }
mongoose
  .connect(
    'mongodb+srv://yahya:yahya05950@cluster0.p43hyvb.mongodb.net/?retryWrites=true&w=majority',
    {
      dbName: 'contruction_project',
      user: 'yahya',
      pass: 'yahya05950',
    }
  )
  .then(() => {
    console.log('connected DATABASE');
  })
  .then(() => {
    // Seed users
    // const totalUsers = 10000;
    // const users = [];

    // for (let i = 1; i <= totalUsers; i++) {
    //   const user = new User({
    //     name: faker.name.findName(),
    //     email: faker.internet.email(),
    //     phone: faker.phone.phoneNumber(),
    //     gender: faker.random.arrayElement(['male', 'female']),
    //     birthday: faker.date.past(),
    //     password: faker.internet.password(),
    //   });
    //   users.push(user.save());
    // }
    // User.find().then((users) => {
    //   console.log('Users retrieved successfully');

      // insertTasksForUsers();
    // });
  });

//setting vapid keys details

// app.get("/test", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });
// app.all("/test", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });

const UserRoute = require('./Routes/User.route');
const TaskRoute = require('./Routes/Task.route');
const NotificationRoute = require('./Routes/Notification.route');

app.use('/tasks', TaskRoute);
app.use('/notifications', NotificationRoute);
app.use('/api/auth', UserRoute);

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log('connected');
});
