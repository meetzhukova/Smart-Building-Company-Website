import { db } from "./firebase.js";
import { collection, doc, deleteDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const devicesCollection = collection(db, "devices");
const tableBody = document.getElementById("deviceTable");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
let devices = [];
let editingId = null;

const hasNote = (device) => Boolean(device.notes && device.notes.trim());

const getStatusPill = (status) => {
  const value = (status || "").toLowerCase();
  let className = "status-pill--default";
  let label = status || "—";

  if (value === "active") {
    className = "status-pill--online";
    label = "Online";
  } else if (value === "offline") {
    className = "status-pill--offline";
    label = "Offline";
  } else if (value === "testing") {
    className = "status-pill--testing";
  } else if (value === "maintenance") {
    className = "status-pill--maintenance";
  }

  return `<span class="status-pill ${className}">${label}</span>`;
};

window.openEdit = (id) => {
  const device = devices.find((item) => item.id === id);
  if (!device) return;

  editingId = id;
  document.getElementById("editName").value = device.name;
  document.getElementById("editType").value = device.type;
  document.getElementById("editStatus").value = device.status;
  document.getElementById("editLocation").value = device.location;
  document.getElementById("editNotes").value = device.notes || "";
  document.getElementById("editRegisteredBy").textContent = device.registeredBy || "—";
  document.getElementById("editModal").classList.add("open");
};

window.openNote = (id) => {
  const device = devices.find((item) => item.id === id);
  if (!device || !hasNote(device)) return;

  document.getElementById("noteContent").textContent = device.notes.trim();
  document.getElementById("noteModal").classList.add("open");
};

window.closeNoteModal = () => {
  document.getElementById("noteModal").classList.remove("open");
};

window.closeModal = () => {
  document.getElementById("editModal").classList.remove("open");
  editingId = null;
};

window.saveEdit = async () => {
  if (!editingId) return;

  await updateDoc(doc(db, "devices", editingId), {
    name: document.getElementById("editName").value,
    type: document.getElementById("editType").value,
    status: document.getElementById("editStatus").value,
    location: document.getElementById("editLocation").value,
    notes: document.getElementById("editNotes").value.trim(),
    lastChecked: new Date().toLocaleDateString("en-GB"),
  });

  closeModal();
};

window.deleteDevice = async (id) => {
  if (!confirm("Delete this device?")) return;
  await deleteDoc(doc(db, "devices", id));
};

const renderNoteCell = (device) => {
  if (!hasNote(device)) {
    return `<span class="note-empty">—</span>`;
  }

  return `
    <button type="button" class="note-btn" onclick="openNote('${device.id}')" aria-label="View note for ${device.name}" title="View note">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  `;
};

const renderDevices = (list) => {
  tableBody.innerHTML = "";

  list.forEach((device) => {
    tableBody.innerHTML += `
      <tr>
        <td>${device.name}</td>
        <td>${device.type}</td>
        <td>${getStatusPill(device.status)}</td>
        <td>${device.location}</td>
        <td>${device.lastChecked || "—"}</td>
        <td>${device.registeredBy || "—"}</td>
        <td>${renderNoteCell(device)}</td>
        <td>
          <button class="action-btn edit-btn" onclick="openEdit('${device.id}')">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteDevice('${device.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
};

const applyFilters = () => {
  const search = searchInput.value.toLowerCase();
  const status = filterStatus.value;

  const filtered = devices.filter(
    (device) =>
      (device.name.toLowerCase().includes(search) ||
        device.type.toLowerCase().includes(search) ||
        device.location.toLowerCase().includes(search) ||
        (device.registeredBy && device.registeredBy.toLowerCase().includes(search)) ||
        (device.notes && device.notes.toLowerCase().includes(search))) &&
      (status === "" || device.status === status)
  );

  renderDevices(filtered);
};

searchInput.addEventListener("input", applyFilters);
filterStatus.addEventListener("change", applyFilters);

document.getElementById("editModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

document.getElementById("noteModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeNoteModal();
  }
});

onSnapshot(devicesCollection, (snapshot) => {
  devices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  applyFilters();
});
