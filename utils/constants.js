import { createContext } from "react"

export const URL_BASE = "https://geo.tunja.gov.co:8080/api"
export const URL_BASE_HEROKU = "https://tunjadata.herokuapp.com/api"
export const COLORS = {
  azul: "#126DB4",
  azul_oscuro: "#2E529C",
  azul_claro: "#18B8EC",
  morado: "#98348A",
  morado_oscuro: "#63337F",
  amarillo: "#EEC712",
  rojo: "#E73A2A",
  verde: "#067E5B",
  verde_claro: "#14935C",
}

export const CARTEL_COLORS = {
  azul: "#0392cf",
  rojo: "#ee4035 ",
  verde: "#7bc043",
  negro: "#1e1f26",
}

export const TUNJA_LOCATION = {
  latitude: 5.5446161583332865,
  longitude: -73.35755698893324,
  longitudeDelta: 0.05,
  latitudeDelta: 0.05,
}

export const FilterContext = createContext("")
