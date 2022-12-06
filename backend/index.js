import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import fileUpload from "express-fileupload";
import productRouter from "./routes/ProductRoute.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(productRouter);

app.listen(5000, () => console.log('Server up and running...'));