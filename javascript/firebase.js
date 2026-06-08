import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
export const db = getFirestore(app);