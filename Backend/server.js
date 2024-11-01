import express from "express";
import dotenv from "dotenv";
import bodyParser from'body-parser'
import morgan from "morgan";
import cors from "cors";
import connectDb from "./src/db/conn.js";
import userRoutes from "./src/routes/userRoute.js"


dotenv.config();
connectDb();

const app = express();

app.use(bodyParser.json()); // For JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use('/api', userRoutes);






const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
