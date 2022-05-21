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

const getRutas = async ( {coords, filter} ) => {
  try {
    let res = {}

    if (coords.origen && coords.destino) {
      res = await fetch(`${URL_BASE}/rutas-filter`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origen: coords.origen,
          destino: coords.destino,
          filter
        }),
      })
    } else {
      res = await fetch(`${URL_BASE}/rutas?filter=${filter}`)
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
