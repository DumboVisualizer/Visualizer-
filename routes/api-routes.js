const db = require("../models");

module.exports = app => {

  app.get("/", (req, res) => {
    res.render("frontpage", null);
  });

  app.get("/login",(req,res)=> {
    res.render("login",null);
  });
};
  