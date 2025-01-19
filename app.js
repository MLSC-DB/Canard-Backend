// libraries
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
//utils
import sendErrorMail from "./utils/sendErrorMail.js";
import responseHandler from "./middlewares/responseHandler.js";
import connectMongo from "./config/db.js";
import config from "./config/config.js";
//routes
import teamRoutes from "./routes/team.routes.js";
import userRoutes from "./routes/user.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import handRoutes from "./routes/hand.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
const __dirname = path.resolve();

connectMongo();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || "*");
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseHandler);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("<h1>Canard 2025</h1>");
});

app.use("/team", teamRoutes);
app.use("/user", userRoutes);
app.use("/settings", settingsRoutes);
app.use("/hand", handRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  if (error.errors && error.errors[0].message) {
    return res.error(400, error.errors[0].message, "VALIDATION_ERROR");
  }

  if (error.isOperational) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.error(statusCode, message, error.errorCode, error.data);
  } else {
    // sendErrorMail(error);
    console.error("ALERT ALERT ALERT");
    console.error("Unhandled error:", error);
    return res.error(500, "Internal Server Error", "UNHANDLED_ERROR");
  }
});

server.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

// check whether all are safehandled
// prepare the role based access control and role priority
// check for invalid object id everywhere
// check parseInt everywhere
// convert to IST everywhere
// powerups
// add a failsafe that the distribution script runs if it has not already before the event starts
// send registration mails
// put await everywhere in db operations where we did not think it necessary
// send websocket alerts to apps on phases start and end
// check for blocked teams everywhere
// are you really doing it according to taskOrders
// ask whether to keep a team score or not
// read team post route once more
// add announcement route in admin routes
// what all information about the team do you want after completion of the event
// are we announcing even on completion of task?

// more onboards left for each phase
// see if you can add a task time limit if its possible


//after it
// do not put the team to idle after the major tasks of the phase is over now

// I am not noting down the time of completion of minor tasks by any team
// also set team to completedAll if all minor and majorr have been completed

/// since the no of major tasks and minor tasks are different and seperate now, you have to remove the checks where you are comparing it to the length of the tasks array

// the completed time of a phase is defined as the point of time when the team enters the correct answer for the phase (NOT WHEN THEY COMPLETE ALL THE MAJOR AND MINOR TASKS)
// dont make them idle after completion of major tasks, only after completion of all tasks(i.e. minor included)
//dont change currentTask to -1 after completion of major tasks, only after completion of all tasks(i.e. minor included)
// send success messages in each route

// completed tasks are the no of major tasks done