import React from 'react';
import LoginScreen from "./src/pages/Login";
// import Profile from "./client/src/pages/Profile";
import { View, Text } from "react-native";
import ProfileScreen from "./src/pages/ProfileScreen";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import BottomTabBar from "react-navigation-selective-tab-bar";
import Photos from "./src/pages/Photos"
import CameraView from "./src/pages/Camera"
import Contacts from "./src/pages/Contacts"
import { Ionicons } from '@expo/vector-icons';

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
  Camera: { screen: CameraView },
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
  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `${focused ? 'md-contact' : 'ios-contact'}`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Photos: {
    screen: PhotosTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-image${focused ? '' : 's'}`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Camera: {
    screen: CameraTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `${focused ? 'md-camera' : 'ios-camera'}`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Contacts: {
    screen: ContactsTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `${focused ? 'md-filing' : 'ios-filing'}`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  }
},
  {
    tabBarComponent: props => {
      return (
        <BottomTabBar
          {...props} // Required
          display={["Profile", "Photos", "Camera", "Contacts"]} // Required
          background="darkgrey" // Optional
        />
      );
    },
    tabBarOptions: {
      activeTintColor: '#FF0000',
      inactiveTintColor: "black",
    },
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