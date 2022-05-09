import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTS2g0QA1woLqyGc-s4wKE2M4-GmRImEU",
  authDomain: "portalekorporacyjne.firebaseapp.com",
  databaseURL:
    "https://portalekorporacyjne-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portalekorporacyjne",
  storageBucket: "portalekorporacyjne.appspot.com",
  messagingSenderId: "1001455432169",
  appId: "1:1001455432169:web:4181c70ebdffa0c79a9b78",
};

export const app = initializeApp(firebaseConfig);
