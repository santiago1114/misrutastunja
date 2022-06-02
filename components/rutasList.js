import React, { useEffect, useState, useContext } from "react"
import { FlatList, StyleSheet, Text, View, Image } from "react-native"
import { getRutas } from "../api/rutas"
import RutaItem from "./rutaItem"
import { FontAwesome5 } from "@expo/vector-icons"
import { FilterContext } from "../utils/constants"
import { RFPercentage } from "react-native-responsive-fontsize"


const handleEmpty = () => {
  return (
    <View
      style={{ alignItems: "center", marginTop: 20, paddingHorizontal: 30 }}
    >
      <Text style={styles.listHeader}>No hay rutas disponibles</Text>
      <FontAwesome5 name="sad-tear" size={80} style={{ marginVertical: 30 }} />
      <Text>
        Intententa acercando el punto de origen y destino a avenidas o calles
        más concurridas de la ciudad de Tunja
      </Text>
    </View>
  )
}

function RutasList({ coords }) {
  const [rutas, setRutas] = useState(null)
  const { filter } = useContext(FilterContext)

  useEffect(() => {
    getRutas({ coords, filter })
      .then((res) => {
        setRutas(res)
      })
      .catch(console.error)
  }, [coords, filter])

  return (
    <>
      {!rutas ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            style={{ width: 130, height: 80 }}
            source={require("../assets/loading.gif")}
          />
        </View>
      ) : (
        <FlatList
          data={rutas}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({ item }) => <RutaItem item={item} coords={coords} />}
          
        />
      )}
    </>
  )
}

export default RutasList
//ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
const styles = StyleSheet.create({
  itemSeparator: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  listHeader: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    textAlign: "center",
  },
})
