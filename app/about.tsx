import React from 'react';
import './globals.css'; // Import the CSS file

function App() {

  return (
    <div className="App">
      <header className="App-header;
">
        <div  className="rounded-lg have border-2 border-solid p-5">
        <p className="w-50 mt-3 min-h-[150px]">
        <div className="p-5 pb-0">
        ParkIIT
        </div>
        <br />
        <div className="text-sm text-left w-{40px} leading-6 my-2s p-10">
  This web app is designed to optimize the parking situation inside Mindanao State University Iligan Institute of Technology for thesis purposes. With just one click on your designated college, you will be routed to their parking space. A device that detects whether a car is parked will reflect on the web app, showing green for not occupied and red for when occupied.
</div>
</p></div> 
      </header>
    </div>
  );
}

export default App;