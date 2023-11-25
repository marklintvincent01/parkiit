"use client";
import React, { useState, useEffect } from 'react';
import CCS from './ccs';
import CSM from './csm';
import './globals.css'; // Import the CSS file
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in CCS component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in CCS component.</h1>;
    }

    return this.props.children;
  }
}

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
  const [status, setStatus] = useState(null);
  const [showCCSContent, setShowCCSContent] = useState(false);
  const [showCSMContent, setShowCSMContent] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const statusRef = ref(database, 'PARKING/CCS1/STATUS');

    const handleStatusChange = (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue !== null) {
        console.log('Received status from Firebase:', statusValue);
        setStatus(statusValue);
      } else {
        console.error('Failed to retrieve status from Firebase.');
      }
    };

    // Subscribe to status changes
    onValue(statusRef, handleStatusChange);

    // Unsubscribe from status changes when component unmounts
    return () => {
      onValue(statusRef, handleStatusChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCCSButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(true);
    setShowBackButton(true);
  };

  const handleCSMButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(true);
    setShowBackButton(true);
  };

  const handleBackButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowBackButton(false);
  };

  return (
    <main className="flex justify-center min-h-screen mt-8" style={{ fontFamily: "'Microsoft JhengHei UI', sans-serif" }}>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          background-color: #36393F;
        }
      `}</style>
      <div className={`main-container ${showBackButton ? 'slide-left' : ''}`}>
        <div className="frag" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-baseline">
        <div className="text-5xl font-marmelad text-white">
            Welcome to
          </div>
          <div className="text-9xl font-microsoftjhenghei text-white">
            Parkiit
          </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="text-lg mb-4 font-marmelad text-white">
          Please choose an area:
          </div>
          <div className="flex">
            {!showBackButton && !showCCSContent && !showCSMContent && (
              <div className="flex items-center space-x-4">
                <button
                  className="bg-gray-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={handleCCSButtonClick}
                >
                  CCS
                </button>
                <button
                  className="bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={handleCSMButtonClick}
                >
                  CSM
                </button>
                <button
                  className="bg-gray-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={handleCSMButtonClick}
                >
                  CASS
                </button>
              
              </div>
            )}
            {showBackButton && (
              <div className="">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleBackButtonClick}
                >
                  Back
                </button>
              </div>
            )}
          </div>

          <div>
            {/* Additional content */}
          </div>

          <div className={`bark mt-4 ${showBackButton ? 'animate-slide-in-left' : ''} ${showCCSContent || showCSMContent ? 'animate-disappear' : ''}`}>
            {/* Wrap CCS component with the ErrorBoundary */}
            <ErrorBoundary>
              {showCCSContent && <CCS />}
            </ErrorBoundary>
            {showCSMContent && <CSM />}
          </div>
        </div>
      </div>
    </main>
  );
}
