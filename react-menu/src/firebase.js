import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCxvxgkzALj5Mip7GHAJBK9SYnNm9qO0KI",
  authDomain: "alqaysar-menu.firebaseapp.com",
  databaseURL: "https://alqaysar-menu-default-rtdb.firebaseio.com",
  projectId: "alqaysar-menu",
  storageBucket: "alqaysar-menu.firebasestorage.app",
  messagingSenderId: "181160036262",
  appId: "1:181160036262:web:d26f2d2504b880807bb167",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
