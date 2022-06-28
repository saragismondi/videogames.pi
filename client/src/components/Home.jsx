import { React, useState, Fragment } from "react";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, orderBy, filterByGenres, filterBySource, clearfilter } from "../redux/actions/index";
import { useEffect } from "react";
import { SearchBar } from "./SearchBar.jsx";
import { Filtrados } from "./Filtrados";
import { Pagination } from "./Pagination";
import { Loading } from "./Loadind";
import {Error} from "./Error.jsx";
import "../css/Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  const todosLosJuegos = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.allGenres);
  const loading = useSelector((state) => state.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPerPage, setvideoGamesPerPage] = useState(12);
  const inOfLastGame = currentPage * videoGamesPerPage; 
  const inOfFirstGame = inOfLastGame - videoGamesPerPage;
  const currentVideogames = todosLosJuegos.slice(inOfFirstGame, inOfLastGame)

  const pag = (pages) => {
    setCurrentPage(pages)
  };
  useEffect(() =>
    dispatch(getAllVideogames()),
    []);
  function handleClick(e) {
    e.preventDefault();
    dispatch(clearfilter());
    setCurrentPage(1);
    document.getElementById("genreselect").value = "";
    document.getElementById("sourceselect").value = "";
  }
  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames())
    } else {
      dispatch(orderBy(e.target.value))
      setCurrentPage(1)
    }
  };
  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames())
    } else {
      dispatch(filterByGenres(e.target.value))
      setCurrentPage(1)
    }
  };
  function handleSource(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames())
    } else {
      dispatch(filterBySource(e.target.value))
      setCurrentPage(1)
    }
  };
  const handleRedirec = () => {
    window.location.href = "/"
  };
  const handleToTheForm = () => {
    window.location.href = "/form"
  };
  return (
    <div className="homeConteiner">
      {loading ? <Loading /> :
        <>
          <div className="homeTitleConteiner">
            <h4 className="bienvenidos homeTitle">APP DE VIDEOJUEGOS </h4>
            <SearchBar />
          </div>
          <div>
            <button onClick={handleRedirec}> VOLVER INICIO</button>
            <button onClick={handleToTheForm}> CREA TU PROPIO VIDEOJUEGO</button>
            <button
              onClick={(e) => {
                handleClick(e);
              }}>
              Limpiar Filtros
            </button>
          </div>
          <div>
            <Filtrados allGenres={allGenres} handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource} />
          </div>
          <div>
            <Pagination
              videoGamesPerPage={videoGamesPerPage}
              todosLosJuegos={todosLosJuegos.length}
              pag={pag} />
          </div>
          <div className="cardsConteiner">
            {currentVideogames.length > 0 ?
              currentVideogames.map((g) => {
                return (
                  <Fragment key={g.id}>
                    <Card
                      name={g.name} image={g.image} genres={g.genres} id={g.id}
                    />
                  </Fragment>
                );
              }) :
               <Error/>
            }
          </div> </>}
    </div>
  );
};

