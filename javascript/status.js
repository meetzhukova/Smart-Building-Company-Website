import { db } from "../javascript/firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const grid = document.getElementById("statusGrid");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const maintenanceCount = document.getElementById("maintenanceCount");
const offlineCount = document.getElementById("offlineCount");

const dotClass = (status) => `dot-${status.toLowerCase()}`;
const pillClass = (status) => `pill-${status.toLowerCase()}`;

const renderDevices = (devices) => {
  totalCount.textContent = devices.length;
  activeCount.textContent = devices.filter((device) => device.status === "Active").length;
  maintenanceCount.textContent = devices.filter((device) => device.status === "Maintenance").length;
  offlineCount.textContent = devices.filter((device) => device.status === "Offline").length;

  if (!devices.length) {
    grid.innerHTML = '<div class="empty-state">No devices registered yet.</div>';
    return;
  }

  grid.innerHTML = devices
    .map((device) => {
      const status = device.status || "Offline";
      return `
        <div class="device-card ${status.toLowerCase()}">
          <div class="device-card-top">
            <div>
              <p class="device-name">${device.name}</p>
              <p class="device-type">${device.type}</p>
            </div>
            <div class="status-dot ${dotClass(status)}"></div>
          </div>
          <div class="device-meta">
            <p>Location: <span>${device.location}</span></p>
            <p>Last checked: <span>${device.lastChecked}</span></p>
            <p>Registered by: <span>${device.registeredBy || "—"}</span></p>
          </div>
          <span class="status-pill ${pillClass(status)}">${status}</span>
        </div>
      `;
    })
    .join("");
};

onSnapshot(collection(db, "devices"), (snapshot) => {
  const devices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  renderDevices(devices);
});