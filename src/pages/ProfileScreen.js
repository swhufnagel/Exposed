import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Constants from "expo-constants";
import FastImage from 'react-native-fast-image-expo'

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userProfileData: "",
            newPicture: "",
            pictureLoaded: false
        }
    }
    componentDidMount = () => {
        this.setState({
            userProfileData:
                this.props.navigation.state.params.userData
        });
        console.log("constants ", Constants);

    }

    render() {
        const styles = StyleSheet.create({
            App: {
                height: "200%",
                backgroundColor: 'black'
            },
            container: {
                flex: 1,
                paddingTop: Constants.statusBarHeight
            },
            photo: {
                height: 300,
                width: 300,
                borderRadius: 300 / 2
            }

        })
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <LinearGradient colors={['#A9A9A9', '#ff8c8c', '#FF0000']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    <Text>Profile Info</Text>
                    <Image style={styles.photo} source={{ uri: this.state.pictureLoaded ? this.state.newPicture : this.state.userProfileData.picture }} />
                    <Text>You logged in as {this.state.userProfileData.name}(
                    {this.state.userProfileData.nickname})</Text>
                    <Text> Email: {this.state.userProfileData.email_verified ? this.state.userProfileData.email : "No email detected"}</Text>

                    <Text> Device info:
                            Name: {Constants.deviceName}({Constants.deviceYearClass})
                            OS: {Constants.platform.ios.model}
                    </Text>

                </LinearGradient>

            </View>
        );
    }
}

export default ProfileScreen