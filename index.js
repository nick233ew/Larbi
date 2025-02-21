// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArLUGnVXManbVXKFFzzegIbCknvB_nR_o",
  authDomain: "larbi-9acb2.firebaseapp.com",
  databaseURL: "https://larbi-9acb2-default-rtdb.firebaseio.com",
  projectId: "larbi-9acb2",
  storageBucket: "larbi-9acb2.appspot.com",
  messagingSenderId: "455810393150",
  appId: "1:455810393150:web:fe29cc892e93e5214f1d6f",
  measurementId: "G-6M5PY05EVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const chatBox = document.getElementById("chat-box");

document.getElementById("send-btn").addEventListener("click", sendMessage);

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value;

  if (messageText.trim() === "") return;

  const messageRef = ref(database, 'messages/' + Date.now());
  set(messageRef, {
    message: messageText,
    timestamp: Date.now()
  });

  messageInput.value = "";
}

onValue(ref(database, 'messages'), (snapshot) => {
  chatBox.innerHTML = ''; // Clear previous messages
  snapshot.forEach(childSnapshot => {
    const message = childSnapshot.val().message;
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
  });
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
});
