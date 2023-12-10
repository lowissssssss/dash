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

// REGISTER FORM SUBMISSION

// UPDATED
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email already exists
  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    alert("Email already exists. Please use a different email.");
    return;
  }

  const newUser = {
    username,
    email,
    password,
  };

  // Add the new user to the existing users array
  localStorage.setItem("users", JSON.stringify([...users, newUser]));

  alert("Successfully registered! You may now login.");
  window.location.href = "login.html";
});
