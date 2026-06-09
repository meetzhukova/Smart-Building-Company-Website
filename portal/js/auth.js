function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
}

(function initPortalAuth() {
  const userJson = sessionStorage.getItem("user");
  if (!userJson) {
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(userJson);
  const userInfo = document.getElementById("userInfo");
  const userAvatar = document.getElementById("userAvatar");

  if (userInfo) {
    userInfo.textContent = "Signed in as " + user.name;
  }
  if (userAvatar) {
    userAvatar.textContent = user.name.charAt(0).toUpperCase();
  }
})();
