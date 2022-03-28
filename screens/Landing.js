import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  h1: {
    color: '#008F68',
    fontSize: 40,
  },
  h2: {
    color: '#FAE042',
    fontSize: 18,
    marginTop: 8,
  },
});

function Landing() {
  return (
    <View>
      <Text style={styles.h1}>AlligatorChef</Text>
      <Text style={styles.h2}>Providing cajun bacon recipes since 1987.</Text>
    </View>
  );
}

export default Landing;
