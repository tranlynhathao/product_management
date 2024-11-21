const productRoutes = require("./product.route");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("client/pages/home/index");
  });

  app.use("/products", productRoutes);
};
