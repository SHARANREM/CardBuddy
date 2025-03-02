import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZrylLDmVnHdnB3PLCsvG6NNZxo-eS5uA",
    authDomain: "cardbuddy-34015.firebaseapp.com",
    projectId: "cardbuddy-34015",
    storageBucket: "cardbuddy-34015.firebasestorage.app",
    messagingSenderId: "42257245869",
    appId: "1:42257245869:web:6c9ad152bc336e56f30824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Get Form Elements
const questionInput = document.getElementById("qf");
const answerInput = document.getElementById("af");
const keywordsInput = document.getElementById("kf");
const createCardBtn = document.querySelector(".right-form button");

// Function to Add Flashcard
const addFlashcard = async (userId, question, answer, keywords) => {
    try {
        const flashcardRef = collection(db, "UserAuthList", userId, "Flashcards"); // Subcollection
        await addDoc(flashcardRef, {
            Question: question,
            Answer: answer,
            Keywords: keywords,
            createdAt: new Date() // Timestamp
        });

        alert("Flashcard added successfully!");
        questionInput.value = "";
        answerInput.value = "";
        keywordsInput.value = "";
    } catch (error) {
        console.error("Error adding flashcard:", error);
        alert("Failed to add flashcard.");
    }
};

// Handle User Authentication and Flashcard Submission
onAuthStateChanged(auth, (user) => {
    if (user) {
        createCardBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const question = questionInput.value.trim();
            const answer = answerInput.value.trim();
            const keywords = keywordsInput.value.trim();

            if (question && answer && keywords) {
                addFlashcard(user.uid, question, answer, keywords);
            } else {
                alert("Please fill in all fields.");
            }
        });
    } else {
        alert("You need to be logged in to create flashcards.");
    }
});
