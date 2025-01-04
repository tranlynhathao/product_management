module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Enter title again!");
    res.redirect("back");
    return;
  }

  if (req.body.title.length < 8) {
    req.flash("error", "Enter title again (greater than 8 characters)");
    res.redirect("back");
    return;
  }

  next();
};
