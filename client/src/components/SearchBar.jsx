import React from "react";
import { getAllVideogamesByName } from "../redux/actions";
import { useDispatch } from "react-redux"; // esto es de react-redux porque neceito  en este componenete despachar una action 
import { useState } from "react";
import "../css/SearchBar.css";


export const SearchBar = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value)

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllVideogamesByName(input));
    };
    const clear = () => {
        setInput("")
        dispatch(getAllVideogamesByName(""))
    };

    return (
        <div className="searchBarConteiner">
                <input type="text"
                value={input}
                placeholder="Busque su videojuego"
                onChange={(e) => handleInput(e)}></input>
            
            <div>
                <button type="submit"
                    onClick={(e) => handleSubmit(e)}>Buscar</button>
                <button onClick={() => clear()}>
                    Clear
                </button>
            </div>
        </div>
    )
};
