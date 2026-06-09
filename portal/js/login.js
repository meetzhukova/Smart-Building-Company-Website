const users = [
  { email: "erik@techforward.no", password: "admin123", name: "Erik", role: "Admin" },
  { email: "sofia@techforward.no", password: "tech123", name: "Sofia", role: "Technician" },
];

function fillDemo(email, password) {
  document.getElementById("emailInput").value = email;
  document.getElementById("passwordInput").value = password;
  document.getElementById("errorMsg").style.display = "none";
}

function login() {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const errorMsg = document.getElementById("errorMsg");
  const roleBadge = document.getElementById("roleBadge");

  const user = users.find(function (entry) {
    return entry.email === email && entry.password === password;
  });

  if (!user) {
    errorMsg.style.display = "block";
    roleBadge.style.display = "none";
    return;
  }

  errorMsg.style.display = "none";
  sessionStorage.setItem("user", JSON.stringify(user));

  roleBadge.textContent = "Signed in as " + user.name + " · " + user.role;
  roleBadge.style.display = "block";

  setTimeout(function () {
    window.location.href = "portal.html";
  }, 800);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    login();
  }
});

if (sessionStorage.getItem("user")) {
  window.location.href = "portal.html";
}
