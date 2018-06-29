const db = require("../models");

module.exports = app => {

  app.get("/api/Account", function(req, res){
    db.Account.findAll({}).then(function(dbAccount){
    });
  });

  app.post("/api/Account",function(req,res){
    db.Account.create({
      text:req.body.text,
      complete:req.body.complete
    }).then(function(dbAccount){
      res.json(dbAccount);
    })
    .catch(function(err){
      res.json(err);
    })
  })


  app.get("/", (req, res) => {
    res.render("frontpage", null);
  });

  app.get("/login",(req,res)=> {
    res.render("login",null);
  });
};
  