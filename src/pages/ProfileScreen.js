import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Constants from "expo-constants";

class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Profile',
            headerStyle: {
                backgroundColor: '#b0b0b0',
                marginRight: "2%",
                marginLeft: "2%"
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: (
                <Icon
                    name="cog"
                    type="font-awesome"
                    color="black"
                    onPress={navigation.getParam("showSettings")}
                />
            ),
            headerLeft: (
                <Icon
                    name='arrow-left'
                    type='font-awesome'
                    color='black'
                    onPress={navigation.getParam("nowLogout")}
                />
            ),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            userProfileData: "",
            newPicture: "",
            pictureLoaded: false,
            activeTab: 'games'

        }
    }
    componentDidMount = () => {
        console.log(this.props.navigation.state);
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
                <LinearGradient colors={['#A9A9A9', '#ff8c8c', '#FF0000']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.state.pictureLoaded ? this.state.newPicture : this.state.userProfileData.picture }}
                        borderColor='white'
                        borderWidth='5' />
                    <Text>You logged in as {this.state.userProfileData.name}(
                    {this.state.userProfileData.nickname})</Text>
                    <Text> Email: {this.state.userProfileData.email_verified ? this.state.userProfileData.email : "No email detected"}</Text>
                    <Text> Device info:
                            Name: {Constants.deviceName}({Constants.deviceYearClass})
                            OS: {Constants.platform.ios.model}
                    </Text>
                </LinearGradient>
            </View>

        )
    }
}

export default ProfileScreen