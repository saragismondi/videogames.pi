import axios from "axios";

export const ALL_VIDEOGAMES = "ALL_VIDEOGAMES";
export const ALL_VIDEOGAMES_BY_NAME = "ALL_VIDEOGAMES_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_ALL_GENRE = "GET_ALL_GENRE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ORDER_BY = "ORDER_BY";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const LOADING = "LOADING";

export function getAllVideogames() {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      const json = await axios.get("http://localhost:3001/videogames");
      // console.log(json.data, "soy data de la action  ")
      dispatch({
        type: LOADING,
        payload: false,
      });
      return dispatch({
        type: "ALL_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(error);
    }
  };
}
export function getAllVideogamesByName(name) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      const json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      dispatch({
        type: LOADING,
        payload: false,
      });
      return dispatch({
        type: "ALL_VIDEOGAMES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(error);
    }
  };
}

// export function getAllVideogamesByName(name) {
//   // siempre pasar el parametro que necesito en el axios.get
//   return async function(dispatch) {
//    await axios.get(`http://localhost:3001/videogames?name=${name}`)
//       .then((videogamesByName) => dispatch({ type: "ALL_VIDEOGAMES_BY_NAME", payload: videogamesByName.data }))
//        //console.log(getAllVideogamesByName, "SOY LOS NOMBRES DE VIDEOGAME")
//   };
// };

export function getDetail(id) {
  return async function (dispatch) {
    //console.log( "accion de detail")
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      const { data } = await axios.get(`http://localhost:3001/videogame/${id}`);
      //console.log( "INFORMACION DE LA API, GETDETAIL", data)
      dispatch({
        type: LOADING,
        payload: false,
      });
      return dispatch({
        type: "GET_DETAIL",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(error);
    }
  };
}
export function postVideogame(payload) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      const data = await axios.post(`http://localhost:3001/videogame`, payload);
      dispatch({
        type: LOADING,
        payload: false,
      });
      alert("Juego creado")
      return dispatch({
        type: "POST_VIDEOGAME",
        payload: data.data,
      });
    } catch (error) {
      alert("No se pudo crear el juego, intentelo de nuevo")
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(error);
    }
  };
}
export function getAllGenre() {
  return async (dispatch) => {
    try {
      let json = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_ALL_GENRE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const orderBy = (payload) => {
  return {
    type: "ORDER_BY",
    payload,
  };
};
export const filterBySource = (payload) => {
  return {
    type: "FILTER_BY_SOURCE",
    payload,
  };
};
export const filterByGenres = (payload) => {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
};
export const clearfilter = () => {
  return {
    type: "CLEAR_FILTER",
  };
};
export const loading = (payload) => {
  return {
    type: "LOADING",
    payload,
  };
};
