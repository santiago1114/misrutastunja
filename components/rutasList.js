import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { getRutas } from "../api/rutas"
import RutaItem from "../components/RutaItem"

const handleEmpty = () => {
  return <Text style={styles.title}> No hay rutas disponibles</Text>
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
          style={{paddingHorizontal: 20}}
          data={rutas}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({ item }) => <RutaItem item={item} coords={coords} />}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListHeaderComponent={({}) => (
            <Text style={styles.listHeader}>Rutas disponibles</Text>
          )}
        />
      )}
    </>
  )
}

export default RutasList

const styles = StyleSheet.create({
  itemSeparator: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
    textAlign: "center",
  },
})
