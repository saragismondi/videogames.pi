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
  allvideogamesByName: [],
  getVideogameById: [],
  allGenres: [],
  backupfiltered: [],
  loading: false,
};
function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, 
        backupvideogames: action.payload,
        backupfiltered: action.payload,
      };
    case ALL_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
        allvideogamesByName: action.payload
      };
    case GET_DETAIL:
      return {
        ...state,
        getVideogameById: action.payload, 
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
    case FILTER_BY_GENRES:
      let aux = [];

      if (action.payload) {
        aux = state.backupfiltered.filter((e) => {
          if (e.genres.length === 0) {
            return e.genres;
          } else if (e.genres.some((e) => e.name === action.payload)) {
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
    case FILTER_BY_SOURCE:
      let getVg = state.backupvideogames;
      let filtrado = [];
      switch (action.payload) {
        case "api":
          filtrado = getVg.filter((el) => {
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
