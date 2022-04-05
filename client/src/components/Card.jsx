import React from "react";

export const Card = ({name, id, genres, image}) => {
 
const handleDirecToDetails = () => {
    window.location.href = "/home/"  + id

};
    return (
        <div>   
                <h3>NOMBRE:{name}</h3>
                <img src={image} width="400px" height="250px" alt=""/>
                <p>GENEROS</p>
               {genres.map((e) => e)}
               <p></p>
            <button onClick={handleDirecToDetails}> LEER MAS DETALLES </button>
        </div>
    )
};
 