import axios from "axios";

export const ALL_VIDEOGAMES = "ALL_VIDEOGAMES";
export const ALL_VIDEOGAMES_BY_NAME = "ALL_VIDEOGAMES_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_ALL_GENRE = "GET_ALL_GENRE";

export function getAllVideogames() {
  return async function (dispatch) {
   const json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "ALL_VIDEOGAMES",
      payload: json.data
    });
  };
};
export function getAllVideogamesByName(name) {
  // siempre pasar el parametro que necesito en el axios.get
  return async function(dispatch) {
   await axios.get(`http://localhost:3001/videogames?name=${name}`)
      .then((videogamesByName) => dispatch({ type: "ALL_VIDEOGAMES_BY_NAME", payload: videogamesByName.data }))
       //console.log(getAllVideogamesByName, "SOY LOS NOMBRES DE VIDEOGAME")
  };
};

export function getDetail(id){
  return async function(dispatch){
    //console.log( "accion de detail")
    try{
    const  {data} = await axios.get(`http://localhost:3001/videogame/${id}`);
    //console.log( "INFORMACION DE LA API, GETDETAIL", data)
    return dispatch({ type: "GET_DETAIL", payload: data});
       }catch(error){
         console.log(error)
        }
    };
};
export function postVideogame(payload){
  return async function (dispatch) {
    try{
      const data = await axios.post(`http://localhost:3001/videogame`, payload);
      return dispatch({
        type: "POST_VIDEOGAME",
        payload: data.data
      });
    }catch(error){ console.log(error)}
  };
};
export function getAllGenre(){
  return async (dispatch) => {
      let json = await axios.get("http://localhost:3001/genres")
      return dispatch({ type: "GET_ALL_GENRE", payload: json.data})
  }
};
export function orderByRating(){
  
};
