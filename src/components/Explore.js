
import '../App.css';
import "./Explore.css";
import Recipe from './Recipe'
import React, { useState, useEffect } from 'react';
import { BsPersonFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { auth } from "../firebaseConfig"
import { getDatabase, ref, set, get, child } from "firebase/database";
// import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";


export default function Explore() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const APP_ID = "49f69602";
  const APP_KEY = "f00fd3dca70a9f780f0f516048826d65";
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        get(child(ref(getDatabase()), "Ingredients/" + user.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${snapshot.val().ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(response => response.json())
            .then(data => {
              setRecipes(data.hits);
              for (const r of data.hits) {
                console.log(r.recipe);
              }
            });
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

  async function getRecipes() {
    const input = document.getElementById("searchInput").value;
    console.log(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&health=${input}&q=${"pasta"}&app_id=${this.state.APP_ID}&app_key=${this.state.APP_KEY}`)
    //const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&cuisineType=${input}&app_id=${this.state.APP_ID}&app_key=${this.state.APP_KEY}`)
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.hits);
        for (const r of data.hits) {
          console.log(r.recipe);
        }
      });

  }

  return (
    <div className="main">
      <Navbar id="nav" style={{backgroundColor:"#FF9900"}} expand="lg" className="justify-content-center">
        <Container style={{display:"contents", textAlign:"center"}}>
          <a href="/"><img src={require('../image/icn_cooking.png')} style={{padding:"0 2rem 0 2rem"}}/></a> 
          <h1>LITTLE CHEFS</h1>

          <div style={{marginLeft:"auto", marginRight:"2rem", padding:"0"}}>
            {currentUser ?
            <p>{currentUser.email}</p> : <p></p>}

            <BsPersonFill id="accountIcon" onClick={() => {
              if (!currentUser)
                navigate("/signup");
              else
                navigate("/profile");
            }} />            
          </div>
        </Container>
      </Navbar>

      <div className="search">
        <input type="text" id="searchInput" placeholder="Find your next greatest recipe!"></input>
        <button className="submit-btn" onClick={() => getRecipes()}>Search</button>
      </div>

      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            preptime={recipe.recipe.totalTime}
            steps={recipe.recipe.url}
            cuisinetypes={recipe.recipe.cuisineType}
            healthlabels={recipe.recipe.healthLabels}
            link={recipe.recipe.url}
          />
        ))}


      </div>

      <footer>WIC Winter Dev 2022 App</footer>

    </div>
  );
}

