"use client";
// Import necessary modules and configure Firebase
import React, { useState } from 'react';
import CCS from './ccs';
import CSM from './csm';
import COET from './coet'; // Import the COET component
import PRISM from './prism'; // Import the COET component
import CASS from './cass'; // Import the COET component
import CBAA from './cbaa'; // Import the COET component
import ABOUT from './about'; // Import the COET component
import ANALYTIC from './analytic'; // Import the COET component
import STAT from './stat'; // Import the COET component
import GYM from './gym'; // Import the COET component
import CASHIER from './cashier'; // Import the COET component
import IDS from './ids'; // Import the COET component
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import Image from 'next/image';

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
  const [chartData, setChartData] = useState({
    labels: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
    datasets: [
      {
        label: 'Traffic Density',
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 30], // Replace with your actual data
      },
    ],
  });
  const [showHOMEContent, setShowHOMEContent] = useState(false);
  const [showABOUTContent, setShowABOUTContent] = useState(false);
  const [showANALYTICContent, setShowANALYTICContent] = useState(false);
  const [showCCSContent, setShowCCSContent] = useState(false);
  const [showCSMContent, setShowCSMContent] = useState(false);
  const [showPRISMContent, setShowPRISMContent] = useState(false);
  const [showCOETContent, setShowCOETContent] = useState(false);
  const [showCBAAContent, setShowCBAAContent] = useState(false);
  const [showCASSContent, setShowCASSContent] = useState(false);
  const [showGYMContent, setShowGYMContent] = useState(false);
  const [showSTATContent, setShowSTATContent] = useState(false);
  const [showIDSContent, setShowIDSContent] = useState(false);
  const [showCASHIERContent, setShowCASHIERContent] = useState(false);



  const [showBackButton, setShowBackButton] = useState(false);
  const [showDefaultContent, setShowDefaultContent] = useState(true);

  // Functions
  const handleANALYTICButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(false);
    setShowDefaultContent(false);
    setShowANALYTICContent(true);
    setShowABOUTContent(false);
    setShowHOMEContent(false);

  };
  const handleABOUTButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(false);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(true);
    setShowHOMEContent(false);

  };
  const handleHOMEButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(false);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowDefaultContent(true);

  };
  const handleCCSButtonClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(true);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleCSMButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(true);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleCOETClick = () => {
    setShowCSMContent(false);
    setShowCCSContent(false);
    setShowCOETContent(true);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowCBAAContent(false);
    setShowIDSContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handlePRISMButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(true);
    setShowCBAAContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);    
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleGYMButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(true);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleCASSButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(true);
    setShowIDSContent(false);
    setShowCASHIERContent(false);
    setShowCBAAContent(false);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleCASHIERButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowIDSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(true);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleSTATButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowSTATContent(true);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowBackButton(true);
    setShowDefaultContent(false);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  const handleBackButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowPRISMContent(false);
    setShowSTATContent(false);
    setShowCASSContent(false);
    setShowCBAAContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowIDSContent(false);
    setShowBackButton(false);
    setShowDefaultContent(true);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };
  
  const handleCBAAButtonClick = () => {
    setShowCCSContent(false);
    setShowCSMContent(false);
    setShowCOETContent(false);
    setShowCBAAContent(true);
    setShowPRISMContent(false);
    setShowCASSContent(false);
    setShowCASHIERContent(false);
    setShowGYMContent(false);
    setShowSTATContent(false);
    setShowIDSContent(false);
    setShowBackButton(false);
    setShowDefaultContent(false);
    setShowBackButton(true);
    setShowANALYTICContent(false);
    setShowABOUTContent(false);
    setShowHOMEContent(false);
  };

  // JSX structure
  return (
    <main className="flex gap-5 flex-row mt-5 ml-20 nb-20 ">
      <div className={` flex flex-col gap-5 main-container ${showBackButton ? 'ml-0' : 'ml-0'}`} style={{ height: '200px' }}>
        <div className="flex ml-8 gap-5">
        <Image src="/images/logo.png" width={60} height={50} alt="Map Image"/>
        <div className="park flex items-center">Park<div className="iit">IIT</div></div>
          </div>
        <div className="parental gap-10">  
        <div className="flex side rounded-lg border-2 border-solid flex-col">
    
            <div className="left-nav flex flex-col items-start justify-center  gap-5 ">
              <div className="home home-hover pl-4 p-1 pr-4 "  onClick={handleHOMEButtonClick}>Home</div>
              <div className="analytic  pl-4 p-1 pr-4 analytic-hover p-1 "  onClick={handleANALYTICButtonClick}>Analytics</div>
              <div className="about  pl-4 p-1 pr-4 about-hover p-1"  onClick={handleABOUTButtonClick}>About</div>
              </div>
            </div>                   

                    <div className={`relative pt-0 ${showBackButton ? 'animate-slide-in-left' : ''} ${showCCSContent || showCSMContent || showCOETContent ? 'animate-disappear' : ''}`}>
                      {showDefaultContent && (  
                            <div className="shard min-h-[500px] rounded-lg min-w-[700px] max-h-[500px] max-w-[700px] relative">
                              <div className="mad flex">
                              <div className="roads"> <Image src="/images/roads.png" width={200} height={200} alt="Map Image"     style={{ minWidth: '200px', minHeight: '200px' }}/></div>
                              <div className="med med-hover"><span>MICEL</span></div>
                              <div className="ccs1 ccs1-hover" onClick={handleCCSButtonClick}><span>CCS</span></div>
                              <div className="csm1 csm1-hover" onClick={handleCSMButtonClick}><span>CSM</span></div>
                              <div className="cafe cafe-hover"><span>FOOD COURT</span></div>
                              <div className="cbaa cbaa-hover" onClick={handleCBAAButtonClick}><span>CBAA</span></div>
                              <div className="cer cer-hover"><span>SCE</span></div>
                              <div className="coet1 coet1-hover" onClick={handleCOETClick}><span>COET</span></div>
                              <div className="cashier1 cashier1-hover" onClick={handleCASHIERButtonClick}><span>REGISTRAR</span></div>
                              <div className="cass1 cass1-hover" onClick={handleCASSButtonClick}><span>CASS</span></div>
                              <div className="ids1"><span>IDS</span></div>
                              <div className="gym1 gym1-hover" onClick={handleGYMButtonClick}><span>GYM</span></div>
                              <div className="prism1 prism1-hover" onClick={handlePRISMButtonClick}><span>PRISM</span></div>
                              </div>
                              <div>
                              {/* <div className="stat stat-hover" onClick={handleSTATButtonClick}><span>Analytics</span></div> */}
                              </div>
                            </div>
                      )}
                      </div>
                        <div className="flex">
                              <div>
                              <ErrorBoundary>
                                {showCCSContent && <CCS />}
                                {showCSMContent && <CSM />}
                                {showCBAAContent && <CBAA />}
                                {showCOETContent && <COET />}
                                {showPRISMContent && <PRISM />}
                                {showCASHIERContent && <CASHIER />}
                                {showIDSContent && <IDS />}
                                {showGYMContent && <GYM />}
                                {showSTATContent && <STAT />}
                                {showCASSContent && <CASS />}
                                {showABOUTContent && <ABOUT />}
                                {showANALYTICContent && <ANALYTIC />}



                              </ErrorBoundary>
                              </div>
                              <div className="flex gap-3 flex-row rounded justify-between">
                            </div>
                        </div>
                          {showBackButton && (
                          <button
                            className=" flex ml-auto hover:text-gray-600 text-black font-semibold  rounded-[8px]"
                            onClick={handleBackButtonClick}>

                            <div className="back p-2 rounded-[8px]">
                              BACK</div>
                            </button>
                              )}
                      </div>
                      <div className="footer rounded-lg w-100% h-20"></div>
            </div>
                </main>
  );
}
