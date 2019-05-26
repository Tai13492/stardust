import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import logger from "morgan";
import connectToDb from "./db/index";
import routes from "./routes";

const app = express();

connectToDb();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

app.use(logger("dev"));

app.use(routes);

app.listen(5000, () => console.log("SERVER RUNNING"));
