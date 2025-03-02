import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
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

// Select the container where flashcards will be displayed
const container = document.querySelector(".cont");

// Function to delete a flashcard
const deleteFlashcard = async (userId, cardId) => {
    try {
        await deleteDoc(doc(db, "UserAuthList", userId, "Flashcards", cardId));
        document.getElementById(cardId).remove(); // Remove card from UI
        console.log("Card deleted successfully!");
    } catch (error) {
        console.error("Error deleting card:", error);
    }
};

// Function to fetch and display flashcards
const displayFlashcards = async (userId) => {
    try {
        const flashcardsRef = collection(db, "UserAuthList", userId, "Flashcards");
        const querySnapshot = await getDocs(flashcardsRef);

        container.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const cardId = doc.id;

            const cardElement = document.createElement("div");
            cardElement.classList.add("cardc");
            cardElement.id = cardId; // Assign ID for deletion

            cardElement.innerHTML = `
                <div class="thefront">
                    <h3>Question</h3>
                    <p>${data.Question}</p>
                </div>
                <div class="theback">
                    <h3>Answer</h3>
                    <p>${data.Answer}</p>
                    <h4>Keyword: ${data.Keywords}</h4>
                    <button class="delete-btn" data-id="${cardId}">🗑️ Delete</button>
                </div>
            `;

            container.appendChild(cardElement);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const cardId = event.target.getAttribute("data-id");
                deleteFlashcard(userId, cardId);
            });
        });

    } catch (error) {
        console.error("Error fetching flashcards:", error);
    }
};

// Check if user is logged in and load their flashcards
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayFlashcards(user.uid);
    } else {
        container.innerHTML = "<p>Please log in to view your flashcards.</p>";
    }
});
