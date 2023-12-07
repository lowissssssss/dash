const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

if (!isLoggedIn) {
  window.location.href = "login.html";
}

const displayUsername = document.getElementById("displayUsername");
const displayEmail = document.getElementById("displayEmail");
const logoutBtn = document.getElementById("logoutBtn");
const deleteAccountBtn = document.getElementById("deleteBtn");

const nameInput = document.getElementById("floatingInputName");
const emailInput = document.getElementById("floatingInputEmail");
const passwordInput = document.getElementById("floatingPassword");
// const confirmPasswordInput = document.getElementById("floatingConfirmPassword");
const registerForm = document.getElementById("registerForm");
const changePasswordForm = document.getElementById("changePasswordForm");

const passwordChangeInput = document.getElementById("floatingChangePassword");
const confirmChangePasswordInput = document.getElementById(
  "floatingConfirmChangePassword"
);

const userCredentials = JSON.parse(localStorage.getItem("user"));

displayUsername.textContent = `${userCredentials.username}`;
displayEmail.textContent = `Email: ${userCredentials.email}`;

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  alert("Logged out");
  window.location.href = "login.html";
});

deleteAccountBtn.addEventListener("click", () => {
  localStorage.setItem("user", "");
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "login.html";
});

let username = userCredentials.username;
let email = userCredentials.email;
let password = "";
let confirmPassword = "";

nameInput.value = userCredentials.username;
emailInput.value = userCredentials.email;

nameInput.addEventListener("input", () => {
  username = nameInput.value;
});

emailInput.addEventListener("input", () => {
  email = emailInput.value;
});
passwordInput.addEventListener("input", () => {
  password = passwordInput.value;
});
// confirmPasswordInput.addEventListener("input", () => {
//   confirmPassword = confirmPasswordInput.value;
// });

// UPDATING ACCOUNT FORM SUBMISSION
// I REUSED THE REGISTER FORM FROM REGISTER.JS

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (password !== existingUser.password) {
    alert("Incorrect password");
    return;
  } else {
    existingUser.username = username;
    existingUser.email = email;

    localStorage.setItem("user", JSON.stringify(existingUser));
    alert("Account updated successfully!");
    window.location.reload();
  }
});

// CHANGE PASSWORD

passwordChangeInput.addEventListener("input", () => {
  password = passwordChangeInput.value;
});
confirmChangePasswordInput.addEventListener("input", () => {
  confirmPassword = confirmChangePasswordInput.value;
});

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  } else {
    existingUser.password = password;

    localStorage.setItem("user", JSON.stringify(existingUser));
    alert("Password updated successfully!");
    window.location.reload();
  }
});
