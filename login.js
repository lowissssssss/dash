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

// UPDATED
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    alert("No users registered. Please sign up.");
    return;
  }

  // Find the user by email
  const currentUser = users.find((user) => user.email === email);

  if (!currentUser) {
    alert("User doesn't exist.");
    return;
  }

  if (password !== currentUser.password) {
    alert("Incorrect password!");
    return;
  }

  localStorage.setItem(
    "isLoggedIn",
    JSON.stringify({ status: true, currentUser })
  );

  alert("Login successful");
  emailInput.value = "";
  passwordInput.value = "";
  window.location.href = "profile.html";
});
