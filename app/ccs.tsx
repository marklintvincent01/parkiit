// ./app\page.tsx
"use client";// ./app/page.tsx
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './globals.css'; // Import the CSS file

const firebaseConfig = {
    apiKey: "AIzaSyAtsKBwASydm6x8-kQVM0DuTFed7U8NOd0",
    authDomain: "parkiit.firebaseapp.com",
    projectId: "parkiit",
    storageBucket: "parkiit.appspot.com",
    databaseURL: "https://parkiit-default-rtdb.asia-southeast1.firebasedatabase.app/",
    messagingSenderId: "337466403051",
    appId: "1:337466403051:web:c8d961e6ae6e8c8e0a76ae",
    measurementId: "G-FM5W79GYB2"};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function Home() {
  const [status, setStatus] = useState(null);

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
      onValue(statusRef, null);
    };
  }, []);

  return (
    <main className="sads">
      <h1 className="title">CCS</h1>
      <div>DIGITAL MAP APPEARS HERE</div>
      {status !== null && (
        <div className="mike">
        <div
          id="statusBox"
          className={`status-box ${status ? 'occupied' : 'vacant'}`}
        >
          Status: {status ? 'Occupied' : 'Vacant'}
        </div>
        </div>
      )}
    </main>
  );
}

