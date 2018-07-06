var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
  .goto("http://localhost:8080")
  .wait(200)
  .evaluate(function() {
    return document.querySelector("#login").href;
  })
  .click("#login")
  .wait("#usernameInput")
  .type("#usernameInput", "test")
  .type("#passwordInput", "test")
  .click(".register-btn")
  .wait("#glow-play")
  .click("#glow-play")
  .wait(3000)
  .click("#glow-pause")
  .wait(3000)
  .click("#glow-play")
  .click(".btn-fullscreen")
  .wait(3000)
  .click("#exitFullscreen")
  .wait(3000)
  .click("#glow-pause")
  .end()
  .then(function(result) {
    if (result != null)
        console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
