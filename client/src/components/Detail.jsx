import { React } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../redux/actions";
import { useParams } from "react-router"
import { Loading } from "./Loadind";
import "../css/Detail.css";

export default function Detail() {
    const detalles = useSelector((state) => state.getVideogameById)
    const loading = useSelector((state) => state.loading)
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleDirectToHomeFromDetail = () => {
        window.location.href = "/home"
    };
    useEffect(() => {
        dispatch(getDetail(id))
    }, [])
    var regex = /(<([^>]+)>)/gi;
    return (
        <div className="detailContenier" style={loading ? { backgroundColor: "rgb(243, 240, 174)" } : { backgroundImage: `url(${detalles.image || "https://areajugones.sport.es/wp-content/uploads/2020/05/Adventure-Time-Distant-Lands-BMO.png"})` }}>
            {loading ? <Loading /> :
                <>
                    <h1 className="bienvenidos"> {detalles.name}</h1>
                    <div className="infoDetailConteiner">
                        <p >⭐ {detalles.rating}</p>
                        <p>{detalles.genres?.map(g => (g.name ? g.name : g)).join('| ')}</p>
                        <p> 📅{detalles.released}</p>
                        <div className="detailDescription">📌{detalles.description?.replace(regex, '').replace('&#39', '')}</div>
                        <div className="detailPlatforms" >🎮 {detalles.platforms?.join(', ')}</div>
                        <button onClick={handleDirectToHomeFromDetail}>VOLVER AL HOME</button>

                    </div>
                </>}
        </div>
    )
};