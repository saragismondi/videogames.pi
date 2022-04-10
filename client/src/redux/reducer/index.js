import {
  ALL_VIDEOGAMES,
  ALL_VIDEOGAMES_BY_NAME,
  GET_DETAIL,
  POST_VIDEOGAME,
  GET_ALL_GENRE,
  ORDER_BY,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRES,
  CLEAR_FILTER,
  LOADING,
} from "../actions/index.js";

const InitialState = {
  backupvideogames: [],
  videogames: [],
  getVideogameById: [],
  allGenres: [],
  backupfiltered: [],
  loading: false,
};
// nunca modificar el backupvideogames osea nunca ponerle backupvideogames: action.payload,
function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, /// osea el json.data de las action
        backupvideogames: action.payload,
        backupfiltered: action.payload,
      };
    case ALL_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        getVideogameById: action.payload, // revisar porque viene dentro de un array buscar en api VER ESTO SIN CON [] O SIN
      };
    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case GET_ALL_GENRE:
      return {
        ...state,
        allGenres: action.payload,
      };
    // -----------------------------------OORDENAMIENTO-------------------------------------------------------------
    case ORDER_BY:
      let vgCopy = [...state.videogames];
      let ordenamiento;
      switch (action.payload) {
        case "A-Z":
          ordenamiento = vgCopy.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          break;
        case "Z-A":
          ordenamiento = vgCopy.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          break;
        case "Rating Asc":
          //console.log(vgCopy, "hola soy vg copy")
          ordenamiento = vgCopy.sort(function (a, b) {
            return b.rating - a.rating;
          });
          break;
        case "Rating Desc":
          ordenamiento = vgCopy.sort(function (a, b) {
            return a.rating - b.rating;
          });
          break;
        default:
          ordenamiento = vgCopy;
          break;
      }
      return {
        ...state,
        videogames: ordenamiento,
      };
    //-------------------------------------------------FILTRADO--------------------------------------------------------------------------------------
    case FILTER_BY_GENRES:
      let aux = [];

      if (action.payload) {
        aux = state.backupfiltered.filter((e) => {
          if (e.genres.length === 0) {
            return e.genres;
          } else if (e.genres.some((e) => e.name === action.payload)) {
            // esto no me esta incluyendo cuando algo viene de la DB y cuando de
            return e.genres.map((el) => el.name);
          } else {
            return e.genres.includes(action.payload);
          }
        });
      } else {
        aux = state.videogames;
      }
      return {
        ...state,
        videogames: aux,
      };
    //..................................................FILTRO POR DB................................................................
    case FILTER_BY_SOURCE:
      let getVg = state.backupvideogames;
      let filtrado = [];
      //console.log(getVg)
      //console.log(action.payload === 'api')
      switch (action.payload) {
        case "api":
          filtrado = getVg.filter((el) => {
            //console.log(el.id.length, "hola soy el.id.length")
            //console.log(typeof(el.id), "hola soy el.id TYPEOF")
            //console.log(typeof(el.id))

            if (typeof el.id === "number" && el.id < 10000) {
              return el;
            }
          });
          break;
        case "created":
          filtrado = getVg.filter((el) => {
            if (el.id.length > 9) {
              return el;
            }
          });
          break;
        default:
          filtrado = getVg;
          break;
      }
      return {
        ...state,
        videogames: filtrado,
        backupfiltered: [...filtrado],
      };
    case CLEAR_FILTER:
      return {
        ...state,
        videogames: [...state.backupvideogames],
      };
    case LOADING:
      console.log(action.payload, "hola soy la ction de loading");
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
