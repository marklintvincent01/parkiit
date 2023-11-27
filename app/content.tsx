"use client";
// Import necessary modules and configure Firebase
import React, { useState, useEffect } from 'react';
import CCS from './ccs';
import CSM from './csm';
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

// Firebase configuration
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function Home() {
  // State variables
  const [status, setStatus] = useState(null);
  const [showCCSContent, setShowCCSContent] = useState(false);
  const [showCSMContent, setShowCSMContent] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  // Subscribe to status changes from Firebase on mount
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

    onValue(statusRef, handleStatusChange);

    // Unsubscribe from status changes when component unmounts
    return () => {
      onValue(statusRef, handleStatusChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Event handlers
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

  // JSX structure
  return (
    <main className="flex gap-5 flex-row m-8 ml-20 mr-20 mt-20">
      <div className="p-2 border border-gray-200 rounded-[10px] ">
        
          <div  className="p-3"><div className="max-w-[200px] min-w-[160px] break-words">STUFF</div></div>
          </div>
      <div className="border border-gray-200 rounded-[10px] flex-1">
      <div className="p-2 rounded border-b border-gray-200">
        
      <div className="flex gap-3 flex-row rounded">
          <button
  className="hover:text-blue-400 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px] "
  onClick={handleCCSButtonClick}
          > 
            CCS
          </button>
          <button
            className="hover:text-red-600 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px]"
            onClick={handleCSMButtonClick}
          >
            CSM
          </button>
          <button
            className="hover:text-green-500 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px]"
            onClick={handleCSMButtonClick}
          >
            CASS
          </button>
        </div>
      </div>

      <div className={`main-container ${showBackButton ? 'ml-0' : 'ml-0'}`}>
     
    
        <div className="flex relative flex-col">
          
          <div className={`bark ${showBackButton ? 'animate-slide-in-left' : ''} ${showCCSContent || showCSMContent ? 'animate-disappear' : ''}`}>
            {/* Wrap CCS component with the ErrorBoundary */}
            <ErrorBoundary>
              {showCCSContent && <CCS />}
            </ErrorBoundary>
            {showCSMContent && <CSM />}
            
          </div>
        </div>
      </div>
      </div>

    </main>
  );
}
