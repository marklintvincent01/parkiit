// ./app/csm.tsx
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './globals.css'; // Import the CSS file

const firebaseConfig = {
  // Your Firebase config here
   apiKey: "AIzaSyAtsKBwASydm6x8-kQVM0DuTFed7U8NOd0",
  authDomain: "parkiit.firebaseapp.com",
  projectId: "parkiit",
  storageBucket: "parkiit.appspot.com",
  databaseURL: "https://parkiit-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "337466403051",
  appId: "1:337466403051:web:c8d961e6ae6e8c8e0a76ae",
  measurementId: "G-FM5W79GYB2"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function CSM() {
  const [statusCSM1, setStatusCSM1] = useState(null);
  const [statusCSM2, setStatusCSM2] = useState(null);

  useEffect(() => {
    const statusRefCSM1 = ref(database, 'PARKING/CSM1/STATUS');
    const statusRefCSM2 = ref(database, 'PARKING/CSM2/STATUS');

    const handleDataCSM1 = (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue !== null) {
        console.log('Received status from Firebase (CSM1):', statusValue);
        setStatusCSM1(statusValue);
      } else {
        console.error('Failed to retrieve status from Firebase (CSM1).');
      }
    };

    const handleDataCSM2 = (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue !== null) {
        console.log('Received status from Firebase (CSM2):', statusValue);
        setStatusCSM2(statusValue);
      } else {
        console.error('Failed to retrieve status from Firebase (CSM2).');
      }
    };

    onValue(statusRefCSM1, handleDataCSM1);
    onValue(statusRefCSM2, handleDataCSM2);

    // Cleanup functions
    return () => {
      onValue(statusRefCSM1, handleDataCSM1);
      onValue(statusRefCSM2, handleDataCSM2);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">CSM</h1>
      <div className="mb-8">DIGITAL MAP APPEARS HERE</div>
      {statusCSM1 !== null && statusCSM2 !== null && (
        <div className="flex items-center">
          <div
            id="statusBoxCSM1"
            className={`p-4 rounded ${
              statusCSM1 ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            Status CSM1: {statusCSM1 ? 'Occupied' : 'Vacant'}
          </div>
          <div
            id="statusBoxCSM2"
            className={`p-4 rounded ${
              statusCSM2 ? 'bg-red-500' : 'bg-green-500'
            } text-white ml-4`}
          >
            Status CSM2: {statusCSM2 ? 'Occupied' : 'Vacant'}
          </div>
        </div>
      )}
    </main>
  );
}
