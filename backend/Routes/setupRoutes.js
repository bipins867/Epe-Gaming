const adminRouter = require("./Admin/admin");
const userRouter = require("./User/user");
const filesRouter = require("./Files/files");
const appRouter = require("./App/app");

exports.setupRoutes = (app) => {
  app.use("/app", appRouter);
  app.use("/files", filesRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
};
