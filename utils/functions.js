import * as Location from "expo-location"


export const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        throw new Error("Los permisos de localización fueron denegados")
      } else {
        const location = await Location.getCurrentPositionAsync({})
        return location
      }
    } catch (error) {
      setErrorMsg("Los permisos de localización fueron denegados")
    }
  }
  