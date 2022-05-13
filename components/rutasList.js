import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { getRutas } from "../api/rutas"
import RutaItem from "../components/RutaItem"
import { FontAwesome5 } from "@expo/vector-icons"

const handleEmpty = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 20, paddingHorizontal: 30 }}>
      <Text style={styles.listHeader}>No hay rutas disponibles</Text>
      <FontAwesome5 name="sad-tear" size={80} style={{marginVertical: 30}} />
      <Text>
        Intententa acercando el punto de origen y destino a avenidas o calles
        más concurridas de la ciudad de Tunja
      </Text>
    </View>
  )
}

function RutasList({ coords }) {
  const [rutas, setRutas] = useState([])

  useEffect(() => {
    getRutas(coords)
      .then((res) => {
        setRutas(res)
      })
      .catch(console.error)
  }, [coords])

  return (
    <>
      {!rutas && <Text>Cargando rutas...</Text>}
      {rutas && (
        <FlatList
          style={{ backgroundColor: "#EEEEEE" }}
          data={rutas}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({ item }) => <RutaItem item={item} coords={coords} />}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      )}
    </>
  )
}

export default RutasList

const styles = StyleSheet.create({
  itemSeparator: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
})
