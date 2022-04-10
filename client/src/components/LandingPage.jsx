import React from "react";
import {Link} from "react-router-dom";
import "../css/LandingPage.css";

export const LandingPage = () => {
 return(
        <div className= "landingFondo">
            <h1 className="bienvenidos"> BIENVENIDO A LA APP DE VIDEOGAMES</h1>
            <Link to="/home" > <button className= "landingbotton fill" >Ingrese aqui </button></Link>
        </div>
 );
};