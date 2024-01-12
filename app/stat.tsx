import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

import { Link } from 'react-router-dom';

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
    CBAA1: '',
    CBAA2: '',
    CBAA3: '',
    // Add more parking spaces as needed
  });

  useEffect(() => {
    const parkingSpaces = ['CBAA1', 'CBAA2', 'CBAAS3']; // Add more parking spaces as needed

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
    <main className="flex ">
      <div className="p-4  rounded-lg border-2">
        <table className=" border-2 w-full table-auto border-collapse border border-gray-200">
    
          <tbody>
           
          </tbody>
        </table>
        <div className="p-2 max-w-[200px] min-w-[160px] break-words mt-4">
          <div className="font-bold text-base mb-2">Data Analytics</div>
          <div className="flex flex-col mb-2 text-sm">
            <div className="font-semibold">Traffic Density:</div>
            <div>{/* Your traffic density data goes here */}</div>
          </div>
          <div className="flex flex-col mb-2 text-sm">
            <div className="font-semibold">Peak Hour Analysis:</div>
            <div>10am-3pm</div>
          </div>
          <div className="flex flex-col text-sm">
            <div className="font-semibold">Off-Peak Hour:</div>
            <div>4pm-6pm</div>
          </div>
        </div>
      </div>
    </main>
  );
}
