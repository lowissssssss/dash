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

const session = JSON.parse(localStorage.getItem("isLoggedIn"));

displayUsername.textContent = `${session.currentUser.username}`;
displayEmail.textContent = ` ${session.currentUser.email}`;

logoutBtn.addEventListener("click", () => {
  const isLoggedIn = {
    status: false,
    currentUser: {},
  };
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  alert("Logged out");
  window.location.href = "login.html";
});

// UPDATED

deleteAccountBtn.addEventListener("click", () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const currentUser = isLoggedIn.currentUser;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Remove the current user from the users array based on email
  const updatedUsers = users.filter((user) => user.email !== currentUser.email);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Update the isLoggedIn status to false and clear the currentUser
  isLoggedIn.status = false;
  isLoggedIn.currentUser = {};
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  alert("Account deleted successfully!");
  window.location.href = "login.html";
});

let username = session.currentUser.username;
let email = session.currentUser.email;
let password = "";
let confirmPassword = "";

nameInput.value = session.currentUser.username;
emailInput.value = session.currentUser.email;

nameInput.addEventListener("input", () => {
  username = nameInput.value;
});

emailInput.addEventListener("input", () => {
  email = emailInput.value;
});
passwordInput.addEventListener("input", () => {
  password = passwordInput.value;
});

// UPDATED
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const currentUser = isLoggedIn.currentUser;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (password !== currentUser.password) {
    alert("Incorrect password");
    return;
  } else {
    const previousEmail = currentUser.email; // Store the previous email

    // Update current user's details
    currentUser.username = username;
    currentUser.email = email;

    // Update current user in isLoggedIn
    isLoggedIn.currentUser = currentUser;
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

    // Update user in the users array based on previousEmail
    const updatedUsers = users.map((user) => {
      if (user.email === previousEmail) {
        // Use previousEmail for comparison
        return { ...user, username, email }; // Update username and email fields
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

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

// UPDATED
changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const currentUser = isLoggedIn.currentUser;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  } else {
    // Update the password for the current user
    currentUser.password = password;

    // Update the current user in isLoggedIn
    isLoggedIn.currentUser = currentUser;
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

    // Update the password for the user in the users array based on email
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return { ...user, password };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password updated successfully!");
    window.location.reload();
  }
});
