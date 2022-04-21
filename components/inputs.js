import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

function Inputs({ onPress }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.inputs}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Icon size={30} color="black" name="search-location" />
          </View>

          <View style={{ flexDirection: "column" }}>
            <View style={{height: 50, width:100}}>
              <Text>asas</Text>
            </View>
            <View style={styles.inputs}>
              <Text>asas</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Inputs

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    margin: 10,
  },
})
