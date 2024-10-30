const multer = require("multer");

exports.setFileSizeLimit = ({ fileSizeLimit = 0.5 }) => {
  return (req, res, next) => {
    req.fileSizeLimit = fileSizeLimit * 1024 * 1024;
    next();
  };
};

exports.checkFileSize = (req, res, next) => {
  // Check if Content-Length header exists and is within the limit
  const contentLength = parseInt(req.headers["content-length"], 10);

  if (contentLength > req.fileSizeLimit) {
    return res.status(400).json({
      error: `File size exceeds the ${
        req.fileSizeLimit
      } MB limit. Current Size :- ${contentLength / (1024 * 1024)} MB`,
    });
  }

  next();
};


exports.singleFileHandler = (fileName) => {
  return (req, res, next) => {
    req.fileName = fileName;
    const fields = { name: fileName, maxCount: 1 };
    const storage = multer.memoryStorage();

    const uploads = multer({
      storage: storage,
    });

    return uploads.fields(fields);
  };
};
