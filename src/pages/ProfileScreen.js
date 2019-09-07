import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import Constants from "expo-constants";
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import GestureRecognizer, {
    swipeDirections
} from "react-native-swipe-gestures";

const endpoint = 'https://exposed-app.herokuapp.com';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            userProfileData: "",
            newPicture: "",
            pictureLoaded: false,

        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: '#b0b0b0',
                marginRight: "2%",
                marginLeft: "2%"
            },
            headerTitle: (
                <GestureRecognizer onSwipeDown={navigation.getParam("showSettings")}>
                    <Image style={{ width: 200, height: 30 }} source={require('../../assets/ExposedText.png')} className="AppLogo" alt="logo" />
                </GestureRecognizer>

            ),
            headerRight: (
                <Ionicons
                    name="ios-cog"
                    color="black"
                    size={30}
                    onPress={() => { setState({ isVisible: true }) }}
                />
            ),
            headerLeft: (
                <SimpleLineIcons
                    name='logout'
                    size={25}
                    color='black'
                    onPress={navigation.getParam("nowLogout")}
                />
            ),
        }
    };
    showSettings = () => {
        console.log("showem")
        this.setState({ isVisible: true });
    }
    nowLogout = () => {
        console.log("logging out");
        Alert.alert(
            "Logout from Hay?",
            "This will also log you out from any services you logged in with",
            [
                {
                    text: "Logout",
                    onPress: async () => {
                        let authUrl =
                            "https://dev-ph5frrsm.auth0.com/v2/logout?returnTo=https://auth.expo.io/@swhufnagel/sayhay&client_id=Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
                        const response = await AuthSession.startAsync(
                            {
                                authUrl: authUrl
                            },
                            () => {
                                AuthSession.dismiss();
                            }
                        );
                        console.log("response ", response);
                        this.props.navigation.navigate("Home");
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            { cancelable: true }
        );
    };
    componentDidMount = () => {
        console.log("get param ", this.props.navigation.getParam)
        this.setState({
            userProfileData:
                this.props.navigation.state.params.userData
        });
    }
    render() {
        const styles = StyleSheet.create({
            App: {
                height: "200%",
                paddingTop: Constants.statusBarHeight
            },
            photo: {
                height: 250,
                width: 250,
                borderRadius: 250 / 2,
                marginTop: "15%"
            }

        })
        return (
            <View>

                <LinearGradient colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    <Overlay isVisible={this.state.isVisible}
                        onBackdropPress={() => {
                            this.setState({ isVisible: false });
                        }}>
                        <Text>Settings</Text>
                    </Overlay>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.state.pictureLoaded ? this.state.newPicture : this.state.userProfileData.picture }}
                        borderColor='white'
                        borderWidth='5' />
                    <Text> Name: {this.state.userProfileData.name}
                        {this.state.userProfileData.nickname ?
                            this.state.userProfileData.nickname :
                            ""}
                    </Text>
                    <Text> Nickname: {this.state.userProfileData.nickname}</Text>
                    <Text> Email: {this.state.userProfileData.email_verified ? this.state.userProfileData.email : "No email detected"}</Text>
                    <Text> Device info: {Constants.platform.ios.model}({Constants.deviceYearClass})</Text>
                </LinearGradient>
            </View>

        )
    }
}

export default ProfileScreen