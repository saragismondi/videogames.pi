import React from "react";
import { getAllVideogamesByName } from "../redux/actions";
import {useDispatch} from "react-redux"; // esto es de react-redux porque neceito  en este componenete despachar una action 
import {useState} from "react";


export const SearchBar = () => {
    const [input, setInput ] = useState("");
    const dispatch = useDispatch();

    
    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value)
        // console.log(input)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllVideogamesByName(input));/// TIENE IR LA ACTION DE VIDEOJUEGOS POR NAME 
    }
     // aca tengo que agregar un  handle para que se me limpie
    return(
        <div>
            <input type= "text" 
            placeholder= "Busque su videojuego"
            onChange ={ (e) => handleInput(e)}></input>

            <button type="submit"
            onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
};
