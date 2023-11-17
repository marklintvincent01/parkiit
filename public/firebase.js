import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

// Reference to the "STATUS" field in the database
const statusRef = ref(database, 'PARKING/CCS1/STATUS');

// Listen for changes in the "STATUS" field
onValue(statusRef, (snapshot) => {
    const statusValue = snapshot.val();

    if (statusValue !== null) {
        console.log('Received status from Firebase:', statusValue);

        // Change the color of the box based on the status value
        const statusBox = document.getElementById('statusBox');
        if (statusBox) {
            statusBox.style.backgroundColor = statusValue ? '#e74c3c' : '#2ecc71';
        }
    } else {
        console.error('Failed to retrieve status from Firebase.');
    }
});
