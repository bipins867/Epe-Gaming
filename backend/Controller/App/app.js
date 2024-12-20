exports.getAppInfo = async (req, res, next) => {
  res.json({ version: "1.1.0" });
};
