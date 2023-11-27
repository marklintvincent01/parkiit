"use client";
// Import necessary modules and configure Firebase
import React, { useState } from 'react';
import CCS from './ccs';
import CSM from './csm';
import COET from './coet'; // Import the COET component
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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
  const [showCCSContent, setShowCCSContent] = useState(false);
  const [showCSMContent, setShowCSMContent] = useState(false);
  const [showCOETContent, setShowCOETContent] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showDefaultContent, setShowDefaultContent] = useState(true);

  // Functions
  const handleCCSButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(true);
    setShowCOETContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
  };

  const handleCSMButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(true);
    setShowCOETContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
  };

  const handleCOETClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(false);
    setShowCOETContent(true);
    setShowBackButton(true);
    setShowDefaultContent(false);
  };

  const handleBackButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowBackButton(false);
    setShowDefaultContent(true);
  };

  // JSX structure
  return (
    <main className="flex gap-5 flex-row m-8 ml-20 mr-20 mt-15">
      <div className="p-2 border border-gray-200 rounded-[10px] ">
        <div className="p-3">
          <div className="max-w-[200px] min-w-[160px] break-words">Profile</div>
        </div>
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
              className="hover:text-red-400 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px] "
              onClick={handleCOETClick}
            >
              COET
            </button>
            <button
              className="hover:text-red-600 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px]"
              onClick={handleCSMButtonClick}
            >
              CSM
            </button>
            {showBackButton && (
              <button
                className="ml-auto hover:text-gray-600 hover:bg-gray-100 text-black font-bold p-3 rounded-[8px]"
                onClick={handleBackButtonClick}
              >
                BACK
              </button>
            )}
          </div>
        </div>

        <div className={`main-container ${showBackButton ? 'ml-0' : 'ml-0'}`}>
          <div className="flex flex-col">
            <div
              className={`relative bark ${showBackButton ? 'animate-slide-in-left' : ''} ${showCCSContent || showCSMContent || showCOETContent ? 'animate-disappear' : ''}`}
            >
              {showDefaultContent && (
                <div className="sas">
                  <div className="ccs1 ccs1-hover" onClick={handleCCSButtonClick}></div>
                  <div className="csm1 csm1-hover" onClick={handleCSMButtonClick}></div>
                  <div className="coet1 coet1-hover" onClick={handleCOETClick}></div>
                  <div className="cashier1 cashier1-hover" onClick={handleBackButtonClick}></div>
                  <div className="ids1 ids1-hover" onClick={handleBackButtonClick}></div>
                  <div className="gym1 gym1-hover" onClick={handleBackButtonClick}></div>
                  <div className="prism1 prism1-hover" onClick={handleBackButtonClick}></div>
                </div>
              )}

              <ErrorBoundary>
                {showCCSContent && <CCS />}
                {showCSMContent && <CSM />}
                {showCOETContent && <COET />}
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 border border-gray-200 rounded-[10px]">
        <div className="p-2 max-w-[200px] min-w-[160px] break-words">Data Analytics</div>
      </div>
    </main>
  );
}
