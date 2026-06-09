const users = [
  { email: "erik@techforward.no", password: "admin123", name: "Erik", role: "Admin" },
  { email: "sofia@techforward.no", password: "tech123", name: "Sofia", role: "Technician" },
];

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const roleBadge = document.getElementById("roleBadge");
const loginBtn = document.getElementById("loginBtn");

const fillDemo = (email, password) => {
  emailInput.value = email;
  passwordInput.value = password;
  errorMsg.style.display = "none";
};

const login = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const user = users.find((entry) => entry.email === email && entry.password === password);

  if (!user) {
    errorMsg.style.display = "block";
    roleBadge.style.display = "none";
    return;
  }

  errorMsg.style.display = "none";
  sessionStorage.setItem("user", JSON.stringify(user));

  roleBadge.textContent = `Signed in as ${user.name} · ${user.role}`;
  roleBadge.style.display = "block";

  setTimeout(() => {
    window.location.href = "portal.html";
  }, 800);
};

document.querySelectorAll(".demo-account").forEach((button) => {
  button.addEventListener("click", () => {
    fillDemo(button.dataset.email, button.dataset.password);
  });
});

loginBtn.addEventListener("click", login);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    login();
  }
});

if (sessionStorage.getItem("user")) {
  window.location.href = "portal.html";
}
