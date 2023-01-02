import { React, useState } from 'react';
import "../App.css";
import { auth } from "../firebaseConfig"
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();

        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPW").value;
        let pwConfirm = document.getElementById("signupPWConf").value;

        if (!email || !password || !pwConfirm) {
            alert("Please fill out all the fields");
            return;
        }

        if (password != pwConfirm){
            alert("Passwords don't match");
            return;
        }

        try {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("success");
                    navigate("/login");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(error)
                    // ..
                });
        }
        catch (e) {
            alert(e);
        }
        setLoading(false)
    }

    return (
        <div>
            <link rel="s"></link>
            {/* <div id="signupForm">
                <label for="email">Email: </label>
                <input type="text" id="signupEmail" required />
                <br />

                <label>Password: </label>
                <input type="password" id="signupPW" required />
                <br />
                <label>Password Confirmation: </label>
                <input type="password" id="signupPWConf" required />
                <br />
                <button disabled={loading} onClick={handleSignup}>Sign Up</button>
                <br />
                <Link to="/login">Already have an account?</Link><br />
                <a href="/">Explore Recipes without an account :)</a>
            </div> */}

                <form class="modal-content" action="/action_page.php">
                    <div class="container">
                    <h1>Sign Up For Extra Goodness!</h1>
                    
                    <label for="email">Email: </label>
                    <input type="text" id="signupEmail" required />

                    <label>Password: </label>
                    <input type="password" id="signupPW" required />

                    <label>Password Confirmation: </label>
                    <input type="password" id="signupPWConf" required />

                    <button className='submit-btn' disabled={loading} onClick={handleSignup}>Sign Up</button>

                    <p style={{padding: "1rem 0 0 0"}}> 
                        <Link to="/login">Already have an account?</Link>  <br></br>
                        <a href="/">Explore Recipes without an account :)</a>
                    </p>
                    </div>
                </form>
        </div>
    )
}

