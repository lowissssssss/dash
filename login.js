const emailInput = document.getElementById("floatingInputEmail");
const passwordInput = document.getElementById("floatingPassword");
const loginForm = document.getElementById("loginForm");

let email = "";
let password = "";

emailInput.addEventListener("input", () => {
  email = emailInput.value;
});
passwordInput.addEventListener("input", () => {
  password = passwordInput.value;
});

// LOG IN FORM SUBMISSION

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    localStorage.getItem("user") === "" ||
    localStorage.getItem("user") === null
  ) {
    alert("User doesn't exist");
    return;
  }
  const currentUserRegistered = JSON.parse(localStorage.getItem("user"));
  if (email !== currentUserRegistered.email || currentUserRegistered === "") {
    alert("User doesn't exist.");
    return;
  }

  if (password !== currentUserRegistered.password) {
    alert("Incorrect password!");
    return;
  } else {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));

    alert("Login success");
    emailInput.value = "";
    passwordInput.value = "";
    window.location.href = "profile.html";
  }
});
