import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZrylLDmVnHdnB3PLCsvG6NNZxo-eS5uA",
    authDomain: "cardbuddy-34015.firebaseapp.com",
    projectId: "cardbuddy-34015",
    storageBucket: "cardbuddy-34015.firebasestorage.app",
    messagingSenderId: "42257245869",
    appId: "1:42257245869:web:6c9ad152bc336e56f30824"
};
//Initialization for db
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
//Getting Reference ID's for Registering
let Username = document.getElementById("suname");
let EmailInp = document.getElementById("sumail");
let PasswordInp = document.getElementById("supass");
let RegisterBtn = document.getElementById("subtn");
//Getting Reference ID's for Log in
let EmailInpLog = document.getElementById("simail");
let PasswordInpLog = document.getElementById("sipass");
let LoginBtn = document.getElementById("sibtn");
//Registering User
let registerUser = event => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, EmailInp.value, PasswordInp.value)
        .then(async (credential) => {
            var ref = doc(db, "UserAuthList", credential.user.uid);
            await setDoc(ref, {
                Username: Username.value
            })
        }).then(()=>{
            alert("User Registered You can login now👍");
        })
        .catch((er) => {
            alert("Can't Register now."+er);
        })
};
//Login User
let SignInUser = evt => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, EmailInpLog.value, PasswordInpLog.value)
        .then(async (credential) => {
            var ref = doc(db, "UserAuthList", credential.user.uid);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                sessionStorage.setItem("user-insfo", JSON.stringify({
                    Username: docSnap.data().Username,
                }));
                sessionStorage.setItem("user-creds", JSON.stringify(credential.user));
                window.location.href = "/Components/Main/main.html";
            }

        }).catch((er) => {
            alert("Login Failed");
            console.log(er);
        })
};
//Btn Events
RegisterBtn.addEventListener("click",registerUser);
LoginBtn.addEventListener("click",SignInUser);