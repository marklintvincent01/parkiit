// ./app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Image from 'next/image';

import './globals.css'; // Import the CSS file

const firebaseConfig = {
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

export default function Home() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const statusRef = ref(database, 'PARKING/CCS1/STATUS');

    onValue(statusRef, (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue !== null) {
        console.log('Received status from Firebase:', statusValue);
        setStatus(statusValue);
      } else {
        console.error('Failed to retrieve status from Firebase.');
      }
    });

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="main-container bg-white p-8 rounded-lg">
        <h1 className="text-20x1 font-semibold mt-3">CCS</h1>

</div>
        {status !== '' && (
          <div className="flex items-center">
            <div
              id="statusBox"
              className={`p-4 rounded ${
                status ? 'bg-red-500' : 'bg-green-500'
              } text-white`}
            >
              Status: {status ? 'Occupied' : 'Vacant'}
            </div>
          </div>
        )}
    </main>
  );
}
