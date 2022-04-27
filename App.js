import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import StackNav from "./navigation/StackNav"
import { navigationRef } from "./navigation/rootNavigation"

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNav />
    </NavigationContainer>
  )
}
