import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View, Image } from "react-native"
import { getRutas } from "../api/rutas"
import RutaItem from "../components/RutaItem"
import { FontAwesome5 } from "@expo/vector-icons"

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

  useEffect(() => {
    getRutas(coords)
      .then((res) => {
        setRutas(res)
      })
      .catch(console.error)
  }, [coords])

  return (
    <>
      {!rutas ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            height: "70%",
          }}
        >
          <Image
            style={{ width: 130, height: 80 }}
            source={require("../assets/loading.gif")}
          />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 120 }}
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
