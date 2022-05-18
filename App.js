import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import StackNav from "./navigation/StackNav"
import { navigationRef } from "./navigation/rootNavigation"
import { FlatList, View, StyleSheet, Text, Image } from "react-native"
import AppIntroSlider from "react-native-app-intro-slider"
import { COLORS } from "./utils/constants"

const slides = [
  {
    key: "uno",
    title: "Mis Rutas Tunja \n Encuentra tu ruta para tu destino",
    text: "Mis Rutas Tunja es una iniciativa desarrollada por la Dirección de TIC's y Gobierno Digital de la Alcaldía de Tunja. ",
    image: require("./assets/1.png"),
    backgroundColor: COLORS.azul_claro,
  },
  {
    key: "dos",
    title: "Búsqueda Automática 🤩",
    text: "En el mapa selecciona tu origen y destino, ya sea moviendo el marcador o usando el buscador de direcciones.",
    image: require("./assets/2.png"),
    backgroundColor: COLORS.verde_claro,
  },
  {
    key: "tres",
    title: "Marca el origen y destino, fácil y rápido 🚀",
    text: "Una vez selecciones el origen y el destino se mostrarán las rutas que puedes tomar, si no seleccionas o te falta un campo por seleccionar se mostrarán por defecto todas las rutas disponibles.",
    image: require("./assets/3.png"),
    backgroundColor: COLORS.morado,
  },
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRealApp: false,
    }
  }

  _renderNextButton = () => {
    return (
      <Text style={{
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      }}>Siguiente</Text>
    );
  };
  _renderDoneButton = () => {
    return (
      <Text style={{
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      }}>Hecho</Text>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: item.backgroundColor,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
        <Image
          source={item.image}
          style={{
            
            aspectRatio: 0.7,
            resizeMode: "contain",
            maxHeight: 500,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: "white",
            marginHorizontal: 20,
            textAlign: "center",
          }}
        >
          {item.text}
        </Text>
      </View>
    )
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true })
  }
  render() {
    if (this.state.showRealApp) {
      return (
        <NavigationContainer ref={navigationRef}>
          <StackNav />
        </NavigationContainer>
      )
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      )
    }
  }
}
