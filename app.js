const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
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

// app.get("/test", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });
// app.all("/test", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });


const UserRoute = require("./Routes/User.route");

app.use("/api/auth", UserRoute);



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
  console.log("connected");
});
