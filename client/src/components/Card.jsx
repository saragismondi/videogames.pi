import React from "react";
import "../css/Card.css";
export const Card = ({name, id, genres, image}) => {
 
const handleDirecToDetails = () => {
    window.location.href = "/home/"  + id

};
    return (
        <div className="cardConteiner">   
                <h3 className="bienvenidos cardTitle"> {name}</h3>
                <img src={image} width="400px" height="250px" alt=""/>
                <p className=" bienvenidos cardGenre">Generos</p>
               {genres.map((e) => e + "  | ")}
               <p></p>
               
            <button onClick={handleDirecToDetails}>Mas detalles </button>
        </div>
    )
};
 