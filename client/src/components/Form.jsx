import { React, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGenre, postVideogame, getAllVideogames } from "../redux/actions";
import { Loading } from "./Loadind";
import "../css/Form.css";

export const Form = () => {
    const dispatch = useDispatch()
    const { allGenres, loading } = useSelector((state) => state)
    //console.log( allGenres, "soy allgenres")
    const platforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        "SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];

    useEffect(() => {
        dispatch(getAllGenre());
    }, [])

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
    });

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    const handleRedirectToHome = (e) => {
        e.preventDefault();
        window.location.href = "/home"
    };

    const handleSelectedGenres = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        })
    }
    const handleSelectedPlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.name.trim() === "" || input.name.length < 2) {
            return alert("Coloca un nombre: debe poseer min 2 carácteres");
        } else if (input.description.trim() === "") {
            return alert("Descripción requerida");
        } else if (input.released.trim() === "") {
            return alert("Fecha de lanzamiento requerida");
        } else if (input.rating.trim() === "") {
            return alert("Coloca un Puntaje del 1 al 5");
        } else if (input.platforms.length === 0) {
            return alert("Coloca una o más Plataformas");
        } else if (input.genres.length === 0) {
            return alert("Coloca un o más Generos");
        } else {
            //console.log(input);
            dispatch(postVideogame(input))
            setInput({
                name: "",
                description: "",
                released: "",
                rating: "",
                platforms: [],
                image: "",
                genres: [],
            })
            dispatch(getAllVideogames())
            document.getElementById("platformId").value = "";
            document.getElementById("genreId").value = "";
        }
    };
    const clear = () => {
        setInput("")
        dispatch(getAllVideogames(""))
    };
    return (
        <div className="formConteiner">
            {loading ? <Loading /> :
                <>
                    <h4 className="bienvenidos homeTitle">Aqui puedes ingresar un Videogame ! </h4>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Nombre" />
                            <input type="text" name="description" value={input.description} onChange={handleChange} placeholder="Descripción" />
                            <input type="text" name="released" value={input.released} onChange={handleChange} placeholder="Lanzamiento" />
                            <input type="number" name="rating" value={input.rating} onChange={handleChange} placeholder="Rating" />
                            <div className="box">
                                <select onChange={handleSelectedPlatforms} id="platformId">
                                    <option value="">
                                        Elige plataformas
                                    </option>
                                    {platforms.map((p, i) => {
                                        return <option key={i} value={p} >
                                            {p}</option>
                                    })}
                                </select>
                                <input type="text" name="platforms" value={input.platforms} onChange={handleSubmit} />
                                <select onChange={handleSelectedGenres} id="genreId" >
                                    <option value="">
                                        Elige generos
                                    </option>
                                    {allGenres.map((e) => {
                                        return <option key={e.id} value={e.name}>{e.name}</option>
                                    })}
                                </select>
                                <input type="text" name="genres" value={input.genres} onChange={handleSubmit} />
                            </div>
                            <span>
                                <button type="submit"> Ingresar Juego 🎮</button>
                                <button type= "button" onClick={(e) => handleRedirectToHome(e)}> VOLVER AL INICIO</button>
                            </span>
                            <>
                            <button onClick={() => clear()}>
                                LIMPIAR LOS CAMPOS
                                </button>
                            </>
                        </div>
                    </form>
                </>}
        </div>
    )
};