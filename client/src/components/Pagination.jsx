import React from "react";
import "../css/Pagination.css";

export const Pagination = ({ todosLosJuegos, pag, videoGamesPerPage }) => {
    const pages = [];

    for (let p = 1; p <= Math.ceil(todosLosJuegos / videoGamesPerPage); p++) {
        pages.push(p);
    };
    //console.log(pages, "hola soy las paginas")
    return (
        <nav>
            <ul>
                {pages?.map((num) => {
                    return (
                    <li className="Paginado" key={num}>
                        <button className="BotonPaginado" onClick={() => pag(num)}>
                            {num}
                        </button>
                    </li>
                    )
                })}
            </ul>
        </nav>
    );
};
