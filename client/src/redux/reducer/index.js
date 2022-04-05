import {
    ALL_VIDEOGAMES, ALL_VIDEOGAMES_BY_NAME, GET_DETAIL, POST_VIDEOGAME, GET_ALL_GENRE
} from "../actions/index.js";

const InitialState= {
   videogames : [],
   getVideogameById: [],
   allGenres: []
}
function rootReducer(state = InitialState, action){
    switch(action.type){
        case ALL_VIDEOGAMES:
            return {
            ...state,
              videogames: action.payload, /// osea el json.data de las action 
        }
        case ALL_VIDEOGAMES_BY_NAME:
            return {
                ...state,
               videogames: action.payload,
            }
        case GET_DETAIL:
                return{
                    ...state,
                   getVideogameById: action.payload, // revisar porque viene dentro de un array buscar en api VER ESTO SIN CON [] O SIN  
                }
        case POST_VIDEOGAME:
            return{
                ...state,
                 }
        case GET_ALL_GENRE:
        return{
             ...state,
               allGenres: action.payload,
        };
            
        default: 
        return {
            ...state
        };
    }
};
export default rootReducer;