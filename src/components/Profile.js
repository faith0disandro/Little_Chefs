import { React, useState, useEffect } from 'react';
import "../App.css";
import { auth } from "../firebaseConfig"
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from "firebase/database";

export default function Profile() {
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    const [setIngredients] = useState("");
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                get(child(ref(getDatabase()), "Ingredients/" + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setIngredients(snapshot.val().ingredients);
                        document.getElementById("ingredients").innerHTML = snapshot.val().ingredients;
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
            
        })


        return unsubscribe
    }, [])

    async function handleLogout() {
        await auth.signOut();
        navigate("/login");
    }

    async function addIngredient() {
        let input = document.getElementById("ingredients").value;
        console.log(currentUser.uid)
        set(ref(getDatabase(), "Ingredients/" + currentUser.uid), {
            ingredients: input
        })
            .then(() => {
                alert("Updated successfully!");
            })
            .catch((e) => {
                alert("Update failed!");
            });

    }

    function checkUser() {
        if (currentUser)
            return (<div style={{padding: "5vw"}}>
                <button onClick={() => handleLogout()}>
                    Log Out
                </button>
                {currentUser ?
                    <p>{currentUser.email}</p> : <p></p>}
                <h2>What's in your fridge?</h2>
                <textarea id="ingredients"></textarea><br/>
                <button title="Update Ingredients, split by comma and space" onClick={() => addIngredient()}>Update</button><br /><br />
                <a href="/">Explore Recipes :</a>
            </div>)

        navigate("/login");
    }

    return (
        <div>
            {checkUser()}
        </div>

    );
}