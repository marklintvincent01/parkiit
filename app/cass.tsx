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
  const [statuses, setStatuses] = useState({
    CASS1: '',
    CASS2: '',
    CASS3: '',
    CASS4: '',
    // Add more parking spaces as needed
  });

  useEffect(() => {
    const parkingSpaces = ['COET1', 'COET2', 'COET3', 'COET4']; // Add more parking spaces as needed

    const cleanupFunctions = parkingSpaces.map((space) => {
      const statusRef = ref(database, `PARKING/${space}/STATUS`);

      return onValue(statusRef, (snapshot) => {
        const statusValue = snapshot.val();
        if (statusValue !== null) {
          console.log(`Received status for ${space} from Firebase:`, statusValue);
          setStatuses((prevStatuses) => ({
            ...prevStatuses,
            [space]: statusValue,
          }));
        } else {
          console.error(`Failed to retrieve status for ${space} from Firebase.`);
        }
      });
    });

    return () => {
      // Cleanup functions if needed
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main className="flex flex-col justify-center">
      <div className="flex flex-col  shard min-w-[700px] main-container gap-5 rounded-lg bg-4E525A p-2">
      <div className="flex relative  justify-center items-center text-3xl min-h-[200px]">
  <span className="text-gray-500">
     
    {/* ------MAP------ */}
   <div> <Image src="/images/casspark.png" width={500} height={300} alt="Map Image" />
</div>
     </span>
</div>
<div className="flex flex-row gap-3">
  {Object.entries(statuses).map(([space, status]) => (
    <div key={space} className="flex items-center max-w-[100px] max-h-[150px]">
      <div
        id={`${space}StatusBox`}
        className={`p-3 rounded ${
          status
            ? 'bg-red-500 border-red-300 border-4'
            : 'bg-green-500 border-green-300 border-4'
        } text-white text-sm`}
      >
        {`${space} Status: ${status ? 'Occupied' : 'Vacant'}`}
      </div>
    </div>
  ))}
</div>
      </div>
    </main>
  );
}