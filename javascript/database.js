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

export const devicesCollection = collection(db, "devices");

export async function addDevice(device) {
  await addDoc(devicesCollection, {
    ...device,
    createdAt: serverTimestamp()
  });
}

export function listenToDevices(callback) {
  onSnapshot(devicesCollection, snapshot => {
    const devices = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(devices);
  });
}