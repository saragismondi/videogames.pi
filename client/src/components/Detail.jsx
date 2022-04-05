import {React} from "react"
import  {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import  {getDetail} from "../redux/actions";
import {useParams} from "react-router"



export default function Detail  ({match}) {
const detalles = useSelector((state) => state.getVideogameById)
   const dispatch = useDispatch()
   const {id} = useParams()

    const handleDirectToHomeFromDetail = () => {
        window.location.href = "/home"
    };
     useEffect(()=> {
         dispatch(getDetail(id))
     }, [])
    
    return(
        <div>
            <p>  {detalles.name}</p>
            <button onClick={handleDirectToHomeFromDetail}> VOLVER AL HOME </button>
          
        </div>
    )
};