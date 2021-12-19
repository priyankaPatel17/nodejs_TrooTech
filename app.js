var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
const rateLimit = require("express-rate-limit");
var http = require("http");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-express-middleware");
const FilesystemBackend = require("i18next-node-fs-backend");
var path = require("path");
var cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const _ = require("lodash");
const app = express();
const server = http.createServer(app);
const db = require("./models");

dotenv.config();

const MAX_TIME_FOR_REQUEST = process.env.MAX_TIME_FOR_REQUEST * 1000;
const MAX_REQUEST_PER_IP = process.env.MAX_REQUEST_PER_IP;

const limiter = rateLimit({
  windowMs: MAX_TIME_FOR_REQUEST,
  max: MAX_REQUEST_PER_IP,
  // skipSuccessfulRequests: true,
  message: "Too Many request",
});
i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, "/locales/en.json"),
      addPath: path.join(__dirname, "/locales/en.json"),
    },
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
    },
    fallbackLng: "en",
    preload: ["en"],
  });

app.use(i18nextMiddleware.handle(i18next));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(cors());
app.options("*", cors());
app.use(helmet());


app.use(limiter);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);



app.set("etag", false);
app.use(bodyParser.json());

app.use(morgan("dev"));


db.sequelize.sync({}).then(() => {
  console.log('Drop and Resync Db');
});

app.get("/", (req, res) => {
  res.json({ message: "TrooTech: NodeJS Test" });
});
app.use(require("./routes/index"));


server.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});
