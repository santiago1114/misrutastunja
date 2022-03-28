import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import { getRutas, getRutasTest } from "../api/rutas";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import RutaItem from "../components/RutaItem";

const Inicio = ({navigation})=>{

  const [rutas, setRutas] = useState(getRutasTest());
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getRutas().then(console.log).catch(console.error);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rutas}
        keyExtractor={(item)=>{item.properties.pk}}
        renderItem={({item}) => (
              <RutaItem item={item} onPress={()=> navigation.navigate('Mapa')}/>
          )}
        ItemSeparatorComponent= {()=>(<View style={styles.itemSeparator}/>)}
        ListHeaderComponent={({})=>(<Text style={styles.listHeader}>Lista de Rutas</Text>)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  itemSeparator: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default Inicio;
