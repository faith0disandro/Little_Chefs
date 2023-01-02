import React, { useState } from "react"
import { auth } from "../firebaseConfig"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPW").value;

        try {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("login success");
                    
                    navigate('/');
                    // ...
                })
                .catch((error) => {
                    alert(error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } catch (e) {
            alert(e)
        }

        setLoading(false)
    }

    return (

        <div>
            <form class="modal-content">
                    <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email: </label>
                    <input type="text" id="signupEmail" required />

                    <label>Password: </label>
                    <input type="password" id="signupPW" required />

                    <button className="submit-btn" disabled={loading} onClick={handleLogin}>Login</button>

                    <p style={{padding: "1rem 0 0 0"}}> 
                        <Link to="/signup">Create an account</Link>  <br></br>
                        <a href="/">Explore Recipes without an account :)</a>
                    </p>
                    </div>
                </form>
        </div>
    )
}
