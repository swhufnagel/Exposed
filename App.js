import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./src/pages/Login";
// import Profile from "./client/src/pages/Profile";
import { View, Text } from "react-native";
import ProfileScreen from "./src/pages/ProfileScreen";

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
},
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: 'black' },
  });
const App = createAppContainer(MainNavigator);

export default App;
