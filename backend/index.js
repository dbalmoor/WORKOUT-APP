// Import dotenv using ES module syntax
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


//express
const app = express();

import workoutRoutes from './routes/workoutRoutes.js';

//middleware
app.use(express.json());

app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

//connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB,listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(`DB connection error ${err}`);
  });
