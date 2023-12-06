const nameInput = document.getElementById("floatingInputName");
const emailInput = document.getElementById("floatingInputEmail");
const passwordInput = document.getElementById("floatingPassword");
const confirmPasswordInput = document.getElementById("floatingConfirmPassword");
const registerForm = document.getElementById("registerForm");

let username = "";
let email = "";
let password = "";
let confirmPassword = "";

nameInput.addEventListener("input", () => {
  username = nameInput.value;
});

emailInput.addEventListener("input", () => {
  email = emailInput.value;
});
passwordInput.addEventListener("input", () => {
  password = passwordInput.value;
});
confirmPasswordInput.addEventListener("input", () => {
  confirmPassword = confirmPasswordInput.value;
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  } else {
    localStorage.setItem("user", JSON.stringify({ username, email, password }));

    alert("Successfully registered! You may now login.");
    window.location.href = "login.html";
  }
});
