import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
const App = () => {
  return <AppNavigation />;
};

export default App;

const styles = StyleSheet.create({});
