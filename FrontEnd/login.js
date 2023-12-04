const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#login-form"),
};
const loginForm = document.querySelector("#login");

 loginForm.addEventListener("click", (a) => {
    a.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: element.email.value,
        password: element.password.value,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("Token", data.token);

            if (data.message || data.error) {
                alert("Erreur dans l\'identifiant ou le mot de passe");
            } else {
                window.location.replace("index.html");
            }
        })
});
