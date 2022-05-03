import { URL_BASE } from "../utils/constants"

const getRuta = async (id) => {
  try {
    const res = await fetch(`${URL_BASE}/ruta/${id}`)
    const result = await res.json()
    const coord = result.coordinates
    const coordObjs = coord.map((val) => {
      return { latitude: val[1], longitude: val[0] }
    })
    return coordObjs
  } catch (error) {
    throw error
  }
}

const getRutas = async ( coords ) => {
  try {
    let res = {}

    //console.log("EN RUTAS ",coords)

    if (coords) {
      res = await fetch(`${URL_BASE}/rutas-filter`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origen: coords.origen,
          destino: coords.destino,
        }),
      })
    } else {
      res = await fetch(`${URL_BASE}/rutas`)
    }
    const result = await res.json()
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  getRutas,
  getRuta,
}
