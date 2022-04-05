import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllVideogames } from "../redux/actions";
import {Card} from "../components/Card";


export const Cards = () => {
    const dispatch = useDispatch()
    let allVideoGames = useSelector((state) => state.videogames)// el estado global de redux

    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch])// para que no se haga un loop infinito de llamados  es la dependencia  
    //lo que van dentro d la depedendencia es lo que necesito si osi que este para que 
    // se monte la accion, por ejemplo un estado de redux 
    
    return (
        <div>
            {   allVideoGames  &&  allVideoGames.map((e) => {
                return <div key= {e.id}>
                    <Card 
                name={e.name} image={e.image} genres={e.genres} id={e.id} />
           </div>  })}
        </div>
    )
};