// import React from "react";
// import s from '../Styles/PaginadoStyle.module.css';

// export const Paginado = ({ gamesPage, todosLosJuegos, paginado, currentPage }) => {
//     const pageNumbers = [];
//     for (let i = 0; i < Math.ceil(todosLosJuegos / gamesPage); i++) {
//         pageNumbers.push(i + 1)
//     };
//     return(
//         <div className={s.nav}>
      
//             <ul className={s.container} >
//             {currentPage > 1 ? 

// <p className={s.boton} onClick={()=>paginado(currentPage -1) }> {'<<'}  </p>  : <p className={s.boton} >{'<<'} </p>}
//                 {
//                     pageNumbers && pageNumbers.map(number =>(
                        
//                         <p className={`${number === currentPage? s.active : s.boton} `} onClick={()=>paginado(number)} key={number}> {number}</p>
                        

                        
//                     ))
                           
                    
//                 }

//                 {currentPage < pageNumbers.length ? 

//                 <p className={s.boton}  onClick={()=>paginado(currentPage +1) }> {'>>'} </p>  : <p className={s.boton} >{'>>'} </p>}
//             </ul>

       
//         </div>
//     )
// };

   

