import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './routes/users.js';
import {feedbackRouter} from './routes/feedbacks.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use(feedbackRouter);

const DB_URL = "mongodb+srv://admin:cRj8cvgq6XfL9lZz@cluster0.mfnrknp.mongodb.net/Dietarium?retryWrites=true&w=majority";
mongoose.connect(DB_URL)
.then((result) => {
  console.log('database connected, server is working');
  app.listen(4000)
})
.catch((err) => console.log(err));



// app.get('/', (req, res) => {
//     res.send("abcd");
// });

// app.get("/getFeedbacks",async (req, res) => {
//     await feedbackModel.find({}, (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(result);
//       }
//     });
// });
  


// app.post("/contact", async (req, res) => {
//     const feedback = req.body;
//     const newFeedback = new feedbackModel(feedback);
//     await newFeedback.save();
  
//     res.json(feedback);
// });
