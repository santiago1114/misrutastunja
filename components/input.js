import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as rootNavigation from "../navigation/rootNavigation"
import Icon from "react-native-vector-icons/FontAwesome5"

function Input({placeholder, type}) {
  return (
    <TouchableOpacity onPress={() => rootNavigation.navigate("MarkerMap", {type})}>
      <View style={styles.mapInput}>
        <View style={styles.group}>
          <Text style={styles.txt}>{placeholder}</Text>
          <Icon size={24} color="black" name="search-location" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapInput: {
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,253,253,1)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "gray"
  },
  group: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontSize: 15,
    //fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    lineHeight: 19,
    color: "rgba(136,152,170,1)",
  },
})

export default Input
