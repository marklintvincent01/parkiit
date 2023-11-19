import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [statusContent, setStatusContent] = useState('');
  const [statusColor, setStatusColor] = useState('#ffffff'); // Default color
  const parkingRef = firebase.database().ref('PARKING/CCS1/STATUS');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await parkingRef.once('value');
        const status = snapshot.val();
        setStatusContent(status ? 'Occupied' : 'Vacant');
        setStatusColor(status ? '#ff0000' : '#00ff00'); // Red for occupied, green for vacant
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Set up a listener for real-time updates
    const statusListener = parkingRef.on('value', (snapshot) => {
      const status = snapshot.val();
      setStatusContent(status ? 'Occupied' : 'Vacant');
      setStatusColor(status ? '#ff0000' : '#00ff00');
    });

    // Clean up the listener on component unmount
    return () => {
      parkingRef.off('value', statusListener);
    };
  }, [parkingRef]);

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        {/* Add your navigation links here if needed */}
      </nav>

      {/* Content Box */}
      <div
        id="statusBox"
        className="box"
        style={{ display: statusContent ? 'block' : 'none', backgroundColor: statusColor }}
      >
        {statusContent}
      </div>
    </div>
  );
};

export { useClient } from 'react-server-dom-webpack/client';
