import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/StackNav";
import Tabs from "./navigation/Tabs";



export default function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}
