import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenre } from "../redux/actions";

export const Filtrados = ({ handleFilter, handleSource, handleSort }) => {
    const dispatch = useDispatch()
    const generos = useSelector((state) => state.allGenres);
    const todaLaDta = useSelector((state) => state.videogames)
    //console.log(todaLaDta)
    useEffect(() => {
        dispatch(getAllGenre())
    }, [todaLaDta])
    return (
        <div className="box">
            <select onChange={handleSort} >
                <option value="">Ordenar por...</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Rating Asc">Rating Asc</option>
                <option value="Rating Desc">Rating Desc</option>
            </select>
            <select id="genreselect" onChange={handleFilter}>
                <option value="">Generos</option>
                {generos && generos.map(g => {
                    return (
                        <option key={g.id} value={g.name}>{g.name}</option>
                    )
                })}
            </select>
            <select id="sourceselect" onChange={handleSource}>
                <option value=""> Todos</option>
                <option value="api">Videogames</option>
                <option value="created">Creados</option>
            </select>
        </div>
    )
};