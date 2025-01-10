module.exports =
  (defaultUrl = "/") =>
  (req, res) => {
    const referer = req.session?.lastReferer;

    if (referer) {
      res.redirect(referer);
    } else {
      res.redirect(defaultUrl);
    }
  };
