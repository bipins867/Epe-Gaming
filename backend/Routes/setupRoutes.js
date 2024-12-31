const adminRouter = require("./Admin/admin");
const userRouter = require("./User/user");
const filesRouter = require("./Files/files");
const appRouter = require("./App/app");
const webRouter=require('./Web/web');

exports.setupRoutes = (app) => {
  app.use('/web',webRouter);
  app.use("/app", appRouter);
  app.use("/files", filesRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
};
