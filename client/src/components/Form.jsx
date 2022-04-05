import { React, useState } from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllGenre, postVideogame} from "../redux/actions";

export const Form = () => {
    const dispatch = useDispatch()
    const allGenres = useSelector((state) => state.allGenres)
  
  const plataform = ["xbox", "play", "swicht", "PC"]

    useEffect(() => {
        dispatch(getAllGenre());
    },[dispatch])
   
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genre: [],
     });
    
    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    const handleRedirectToHome = () => {
    window.location.href = "/home"
    };

    const handleSelected = (e) =>{
      setInput({
          ...input,
          platforms: [...input.platforms, e.target.value],
          genres: [...input.genres, e.target.value],
      })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postVideogame(input))
         setInput({
             name: "",
             description: "",
             released: "",
             rating: "",
             platforms: [],
             image: "",
             genre: [], // esto no se si esta bien pero bueno...
         })
     };
    return (
        <div>
            <button onClick={handleRedirectToHome}> VOLVER AL HOME</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Name</label>
                    <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="aqui va el nombre" />
                    <div></div>
                    <label >description</label>
                    <input type="text" name="description" value={input.description} onChange={handleChange} placeholder="aqui va el la description" />
                    <p></p>
                    <label >released</label>
                    <input type="text" name="released" value={input.released} onChange={handleChange} placeholder="aqui va cuando se lanzo" />
                    <p></p>
                    <label >rating </label>
                    <input type="number" name="rating" value={input.rating} onChange={handleChange} placeholder="aqui va el rating" />
                    <p></p>
                    <select onChange={handleSelected}>
                        <option >
                            Select the plataform
                        </option>
                       {plataform.map((e, i) => { 
                          return <option key={i} value={e} >{e}</option>
                       })}
                    </select>
                    <select onChange={handleSelected} >
                        <option >
                            Select the genres
                        </option>
                       {allGenres.map((e) => { 
                          return <option key={e.id} value={e.name}>{e.name}</option>
                       })}
                    </select>
                    <input type="submit" value={"create"} />
                </div>
            </form>
        </div>
    )
};