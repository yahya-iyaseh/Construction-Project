const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
//web-push
const webpush = require('web-push');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  });

// notifcations
//storing the keys in variables
const publicVapidKey = 'BOZQTkrPtIOqg8QmEh1ld_dPJDsNZI3YpuSfJZvP4UTKw325ekUFB_dX3gJBN5wz-TZo8KADFZj3ssR9y9SIx9Q';
const privateVapidKey = 'BPQ0OVLojBv63Ks5O1IEfoTFYcMuzEcBXMjADGkIfa8';

//setting vapid keys details
webpush.setVapidDetails(
  'mailto:mercymeave@section.com',
  publicVapidKey,
  privateVapidKey
);
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
app.use('/tasks', TaskRoute);
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
