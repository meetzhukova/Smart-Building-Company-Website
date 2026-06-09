import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");
const submitBtn = document.querySelector(".submit-btn");
const successMsg = document.getElementById("successMsg");

const getCurrentUser = () => {
  const userJson = sessionStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

const registeredByField = document.getElementById("registeredByName");
const user = getCurrentUser();
if (registeredByField && user) {
  registeredByField.textContent = user.name;
}

const resetForm = () => {
  registerForm.reset();
  submitBtn.textContent = "Register Device";
  submitBtn.disabled = false;
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 3000);
};

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.textContent = "Saving...";
  submitBtn.disabled = true;

  const currentUser = getCurrentUser();

  await addDoc(collection(db, "devices"), {
    name: document.getElementById("deviceName").value,
    type: document.getElementById("deviceType").value,
    status: document.getElementById("deviceStatus").value,
    location: document.getElementById("deviceLocation").value,
    notes: document.getElementById("deviceNotes").value.trim(),
    registeredBy: currentUser ? currentUser.name : "Unknown",
    lastChecked: new Date().toLocaleDateString("en-GB"),
    createdAt: serverTimestamp(),
  });

  resetForm();
});