const db = require("../models");

module.exports = app => {

  app.post("/api/login", (req, res) => {
    db.Account.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
        }
      }).then(account => {
        res.json(account);
      });
  });

  app.post("/api/register", (req, res) => {
    db.Account.findAll({}).then(accounts => {
      for (account of accounts) {
        if (account.username == req.body.username) {
          res.json(account);
          return;
        }
      }
      db.Account.create(req.body)
        .then(account => {
          res.json(account);
        })
        .catch(err => {
          res.json(err);
        });
    });
  })


  app.get("/", (req, res) => {
    res.render("frontpage", null);
  });

  app.get("/login", (req, res) => {
    res.render("login", null);
  });
};