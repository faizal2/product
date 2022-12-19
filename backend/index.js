import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import UserRoute from "./routes/UserRoute.js";
import productRouter from "./routes/ProductRoute.js";
import session from "express-session";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto', // true untuk HTTPS, false untuk HTTP
    }
}))
app.use(cors({
    credentials: true,
    origin: process.env.APP_FRONT
}));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(productRouter);

app.listen(process.env.APP_PORT, () => console.log('Server up and running...'));