import React from 'react';
import LoginScreen from "./src/pages/Login";
// import Profile from "./client/src/pages/Profile";
import { View, Text } from "react-native";
import ProfileScreen from "./src/pages/ProfileScreen";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import BottomTabBar from "react-navigation-selective-tab-bar";
import Photos from "./src/pages/Photos"
import Camera from "./src/pages/Camera"
import Contacts from "./src/pages/Contacts"

const LoginStack = createStackNavigator({
  Login: LoginScreen
})
const ProfileTab = createStackNavigator({
  Profile: { screen: ProfileScreen }
})
const PhotosTab = createStackNavigator({
  Photos: { screen: Photos },
})
const CameraTab = createStackNavigator({
  Camera: { screen: Camera },
})
const ContactsTab = createStackNavigator({
  Contacts: { screen: Contacts },
})
const TabNav = createBottomTabNavigator({
  // Login: {
  //   screen: LoginScreen,
  //   navigationOptions: () => ({
  //     title: ``,
  //     tabBarVisible: false

  //   })
  // },
  Profile: ProfileTab,
  Photos: PhotosTab,
  Camera: CameraTab,
  Contacts: ContactsTab
},
  {
    tabBarComponent: props => {
      return (
        <BottomTabBar
          {...props} // Required
          display={["Profile", "Photos", "Camera", "Contacts"]} // Required
          background="black" // Optional
        />
      );
    }
  }
);

export default createAppContainer
  (createSwitchNavigator(
    {
      Login: LoginStack,
      App: TabNav
    },
    {
      initialRouteName: 'Login'
    }
  ));