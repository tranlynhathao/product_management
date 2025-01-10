module.exports = (req, res, next) => {
  if (!req.session) req.session = {};

  const referer = req.get("Referer");
  if (referer && !referer.includes(req.originalUrl)) {
    req.session.lastReferer = referer;
  }

  next();
};
