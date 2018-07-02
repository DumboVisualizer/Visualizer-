$(document).ready(() => {
    $(".register-btn").on("click", (event) => {
        const data = {
            username: $("#usernameInput").val(),
            password: $("#passwordInput").val()
        };
        $.post("/api/register", data).then(account => {
            loadAccount(account);
        });
    });

    $(".login-btn").on("click", (event) => {
        const data = {
            username: $("#usernameInput").val(),
            password: $("#passwordInput").val()
        };
        $.post("/api/login", data).then(account => {
            loadAccount(account);
        });
    });

    function loadAccount(account) {
        sessionStorage.setItem("username", account.username);
        sessionStorage.setItem("password", account.password);

        window.location = "/"
    }
});