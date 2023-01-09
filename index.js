const express = require("express");
const db = require("./db/connect");
const app = express();
const taskRoutes = require("./route/task.routes");
const loginRoutes = require("./route/login");
const indexsRoutes = require("./route/codeues");
const answerRoutes = require("./route/allquestionandanswer");
const questionRoutes = require("./route/adminquestion");
const markRoutes = require("./route/mark");
const userRoutes = require("./route/user");
const admincreateRoutes = require("./route/admincreate");
const adminloginRoutes = require("./route/adminlogin");
const passwordReset = require("./route/passwordreset");
require("dotenv").config();
db();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT;
app.get("/", (request, response) => {
  response.send("hai hellow welcome");
});

app.use("/api/activities", taskRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/mark", markRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/indexs", indexsRoutes);
app.use("/api/admincreate", admincreateRoutes);
app.use("/api/adminlogin", adminloginRoutes);
app.use("/api/password-reset", passwordReset);
app.listen(PORT, () => {
    console.log(`the app is running in the port ${PORT}`);
  });