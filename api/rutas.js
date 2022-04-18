import { URL_BASE, URL_BASE_HEROKU } from "../utils/constants";

const getRutas = async () => {
  try {
    const res = await fetch(`${URL_BASE_HEROKU}/rutas`);
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};

const getRuta = async (id) => {
  try {
    const res = await fetch(`${URL_BASE_HEROKU}/ruta/${id}`);
    const result = await res.json();
    const coord = result.coordinates;
    const coordObjs = coord.map( (val) => {return { latitude: val[1], longitude: val[0] } })
    return coordObjs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRutas,
  getRuta,
};