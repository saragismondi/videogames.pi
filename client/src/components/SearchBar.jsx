import React from "react";
import { getAllVideogamesByName } from "../redux/actions";
import { useDispatch, useSelector} from "react-redux"; 
import { useState } from "react";
import "../css/SearchBar.css";


export const SearchBar = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
  
  const allvideogamesByName = useSelector((state) => state.allvideogamesByName);
  
    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
       dispatch(getAllVideogamesByName(input)) 
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
                    LIMPIAR CAMPO
                </button>
            </div>
        </div>
    )
};
 
