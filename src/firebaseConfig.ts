// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBtWDbgFpl4Iw2rq0g1nxBsRn0aeCxZrDE",
    authDomain: "ecom-427110.firebaseapp.com",
    projectId: "ecom-427110",
    storageBucket: "ecom-427110.appspot.com",
    messagingSenderId: "805492024204",
    appId: "1:805492024204:web:895f4bd3b45a82702baca9",
    measurementId: "G-V1GRMS3KS4"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
