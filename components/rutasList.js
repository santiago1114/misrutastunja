import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { getRutas } from "../api/rutas"
import RutaItem from "../components/RutaItem"

const handleEmpty = () => {
    return <Text style={styles.title}> No hay rutas disponibles</Text>
  }

function RutasList({onPress}) {
  const [rutas, setRutas] = useState([])

  useEffect(() => {
    getRutas()
      .then((res) => {
        setRutas(res)
      })
      .catch(console.error)
  }, [rutas])

  return (
    <>
      {!rutas && <Text>Cargando rutas...</Text>}
      {rutas && (
        <FlatList
          data={rutas}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({ item }) => (
            <RutaItem item={item} onPress={onPress} />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListHeaderComponent={({}) => (
            <Text style={styles.listHeader}>Lista de Rutas</Text>
          )}
        />
      )}
    </>
  )
}

export default RutasList

const styles = StyleSheet.create({
  itemSeparator: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
