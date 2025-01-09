module.exports = (req, res, next) => {
  if (req.method === "GET") {
    req.session.previousUrl = req.get("Referer") || "/";
  }
  next();
};
