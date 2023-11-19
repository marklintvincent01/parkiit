// ./app/page.tsx
"use client";
import React, { useState } from 'react';
import CCS from './ccs';
import CSM from './csm';
import './globals.css'; // Import the CSS file
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

export default function Home() {
  const [showCCSContent, setShowCCSContent] = useState(false);
  const [showCSMContent, setShowCSMContent] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

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
    <main className="mike">
      <div className={`main-container ${showBackButton ? 'slide-left' : ''}`}>
        {!showBackButton && (
          <>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCCSButtonClick}>
                CCS
              </button>
            </div>

            <div className="mt-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleCSMButtonClick}>
                CSM
              </button>
            </div>
          </>
        )}
        {showBackButton && (
          <div className="mt-1 bottoms"> {/* Adjusted container for "Back" button */}
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleBackButtonClick}>
              Back
            </button>
          </div>
        )}
        <div className={`bark ${showBackButton ? 'slide-in-and-bounce' : ''} ${showCCSContent || showCSMContent ? 'slide-left-and-disappear' : ''}`}>
          {showCCSContent && <CCS />}
          {showCSMContent && <CSM />}
        </div>
      </div>
    </main>
  );
}
