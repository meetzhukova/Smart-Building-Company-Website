import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBd4k_Elw7FJlmlEgLUeSAimLpJb2z0iqU",
  authDomain: "tfb-company.firebaseapp.com",
  projectId: "tfb-company",
  storageBucket: "tfb-company.firebasestorage.app",
  messagingSenderId: "58077464598",
  appId: "1:58077464598:web:c5d878edcc78c1f71bcd37",
  measurementId: "G-DL2V8JC9VH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const devicesCollection = collection(db, "devices");

const tableBody = document.getElementById("deviceTable");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("deviceForm");

let devices = [];

function renderDevices(deviceList) {
  tableBody.innerHTML = "";

  deviceList.forEach(device => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${device.name}</td>
      <td>${device.type}</td>
      <td><span class="status">${device.status}</span></td>
      <td>${device.location}</td>
      <td>${device.lastChecked}</td>
    `;

    tableBody.appendChild(row);
  });

  updateStats();
}

function updateStats() {
  document.getElementById("totalDevices").textContent = devices.length;
  document.getElementById("activeDevices").textContent =
    devices.filter(device => device.status === "Active").length;
  document.getElementById("testingDevices").textContent =
    devices.filter(device => device.status === "Testing").length;
  document.getElementById("maintenanceDevices").textContent =
    devices.filter(device => device.status === "Maintenance").length;
}

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchValue) ||
    device.type.toLowerCase().includes(searchValue) ||
    device.status.toLowerCase().includes(searchValue) ||
    device.location.toLowerCase().includes(searchValue)
  );

  renderDevices(filteredDevices);
});

form.addEventListener("submit", async event => {
  event.preventDefault();

  const newDevice = {
    name: document.getElementById("deviceName").value,
    type: document.getElementById("deviceType").value,
    status: document.getElementById("deviceStatus").value,
    location: document.getElementById("deviceLocation").value,
    lastChecked: new Date().toLocaleDateString("en-GB"),
    createdAt: serverTimestamp()
  };

  await addDoc(devicesCollection, newDevice);
  form.reset();
});

onSnapshot(devicesCollection, snapshot => {
  devices = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  renderDevices(devices);
});