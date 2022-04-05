  import { React, useState } from "react";
import { Cards } from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getDetail } from "../redux/actions";
import { useEffect } from "react";
import { SearchBar } from "./SearchBar.jsx";
//import {Paginado} from "../components/Paginado.jsx";

export const Home = () => {
  const dispatch = useDispatch();
  const todosLosJuegos = useSelector((state) => state.videogames);
  console.log(todosLosJuegos, "estado de redux todos los juegos ")
  
  ////////////////////////PAGINADO//////////////////////
  //  const [currentPage, setCurrentPage] = useState[1] // este es mi estado global de redux que es 1
  //  const [gamesPage] = useState(15); // este es la cantidad de juegos por pagina que es 8
  //  const indexLast = currentPage * gamesPage;
  //  const indexFirst = indexLast - gamesPage;
  //  const currentGames = todosLosJuegos.slice(indexFirst, indexLast);
  ////////////////////////PAGINADO//////////////////////
  useEffect(() => dispatch(getAllVideogames()), 
  //dispatch(getDetail(3191))
  [dispatch]);
  

  // const paginado = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  // } 
 const handleRedirec =() => {
  window.location.href = "/"
 };
 const handleToTheForm = () =>{
   window.location.href = "/form"
 };
  return (
    <div>
      <h4>BIENVENIDO/AS A LA APP DE VIDEOJUEGOS </h4>
      {/* <Paginado currentPage={currentPage} gamesPage={gamesPage}  todosLosJuegos={todosLosJuegos.length} paginado={paginado}/> */}
      <SearchBar />
     
      <button onClick={handleToTheForm}> CREA TU PROPIO VIDEOJUEGO</button>
      <p></p>
      
      <p></p>
    
      <button onClick={handleRedirec}> VOLVER INICIO</button>
      <Cards />
    </div>
  );
};
