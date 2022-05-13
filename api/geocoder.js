export const autocomplete = async (location) => {
  const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    location
  )}&location=5.544528560673818%2C-73.35754935069738&radius=50000&strictbounds=true&key=AIzaSyCBS5-CVeAIdv7MTiUlFKmkZWvuVshv9rc`

  try {
    const res = await fetch(URL)
    const result = await res.json()
    const resultArr = result.predictions
    return resultArr
  } catch (error) {
    throw error
  }
}

export const detail = async (place_id) => {
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCBS5-CVeAIdv7MTiUlFKmkZWvuVshv9rc&place_id=${place_id}`

  try {
    const res = await fetch(URL)
    const result = await res.json()
    const resultArr = result.result
    return resultArr
  } catch (error) {
    throw error
  }
}
