import { URL_BASE } from "../utils/constants"

const getRutas = async () => {
  try {
    const res = await fetch(`${URL_BASE}/rutas-buses`)
    const result = await res.json()
    return result
  } catch (error) {
    throw error
  }
}

const getRutasTest = () => {
  return [
    {
      type: "Feature",
      properties: {
        nombre: "Arboleda - Avenida Norte - Terminal de Transporte",
        pk: "1",
      },
      geometry: {
        type: "LineString",
        coordinates: [[-73.331037, 5.57682]],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "MUISCAS",
        pk: "2",
      },
      geometry: {
        type: "LineString",
        coordinates: [[-73.331037, 5.57682]],
      },
    },
  ]
}

module.exports = {
  getRutas,
  getRutasTest,
}
