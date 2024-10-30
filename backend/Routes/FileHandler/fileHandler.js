const express = require("express");


const {
  setFileSizeLimit,
  checkFileSize,
  singleFileHandler,
} = require("../../Middleware/fileHandler");


exports.fileHandlerRouter = (fileName, fileSize) => {
  const router = express.Router();

  router.use(
    setFileSizeLimit({ fileSizeLimt: fileSize }),
    checkFileSize,
    singleFileHandler(fileName)
  );

  return router;
};
