const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/TestFiles", express.static("./TestFiles"));
app.use("/materialize",express.static("./node_modules/materialize-css/dist"));
app.use("/jquery",express.static("./node_modules/jquery/dist"));

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
