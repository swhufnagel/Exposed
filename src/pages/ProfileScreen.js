import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, Alert, Switch } from 'react-native';
import { Button, Icon, Overlay, ListItem } from 'react-native-elements';
import Constants from "expo-constants";
import { AuthSession } from 'expo';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import GestureRecognizer, {
    swipeDirections
} from "react-native-swipe-gestures";
import * as Font from 'expo-font';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            userProfileData: "",
            newPicture: "",
            pictureLoaded: false,
            userName: "",
            photos: false,
            camera: false,
            contacts: false
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
                navigation.state.params && navigation.state.params.headerRight
            ),
            headerLeft: (
                navigation.state.params && navigation.state.params.headerLeft
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
            "Logout from Exposed?",
            "This will also log you out from any services you logged in with",
            [
                {
                    text: "Logout",
                    onPress: async () => {
                        let authUrl =
                            "https://dev-ph5frrsm.auth0.com/v2/logout?returnTo=https://auth.expo.io/@swhufnagel/exposed&client_id=RQrVtYsNqWFmQHu3oCb6wIzlPT272DDg";
                        const response = await AuthSession.startAsync(
                            {
                                authUrl: authUrl
                            },
                            () => {
                                AuthSession.dismiss();
                            }
                        );
                        console.log("response ", response);
                        this.props.navigation.navigate("Login");
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
        this.props.navigation.setParams({
            headerRight: (<Ionicons
                name="ios-cog"
                color="black"
                size={30}
                onPress={this.showSettings}
            />)
        });
        this.props.navigation.setParams({
            headerLeft: (<SimpleLineIcons
                name='logout'
                size={25}
                color='black'
                onPress={this.nowLogout}
            />)
        });
        console.log("get param ", this.props.navigation)
        this.setState({
            userProfileData:
                this.props.navigation.state.params.userData
        });
        this.makeUpperCase()
    }
    makeUpperCase = () => {
        let name = this.props.navigation.state.params.userData.name;
        let names = name.split(" ");
        if (names.length === 2) {
            let firstName = names[0][0].toUpperCase() + names[0].slice(1);
            let lastName = names[1][0].toUpperCase() + names[1].slice(1);
            let userName = `${firstName} ${lastName}`;
            this.setState({ userName })
        }
        else {
            userName = name;
            this.setState({ userName })
        }
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
            },
            userInfoText: {
                fontSize: 24,
                marginTop: '5%'
            },
            listItem: {
                marginTop: "2%",
                fontWeight: '400',
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
                        <View>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Permissions</Text>
                            <ListItem
                                style={{ marginTop: "5%" }}
                                titleStyle={styles.listItem}
                                title='Photos permissions'
                                hideChevron
                                switch={{
                                    trackColor: {
                                        false: 'white',
                                        true: 'red'
                                    },
                                    value: this.state.photos,
                                    onChange: event => { this.setState({ photos: !this.state.photos }) }
                                }}></ListItem>
                            <ListItem
                                titleStyle={styles.listItem}
                                title='Camera permissions'
                                hideChevron
                                switch={{
                                    trackColor: {
                                        false: 'white',
                                        true: 'red'
                                    },
                                    value: this.state.camera,
                                    onChange: event => { this.setState({ camera: !this.state.camera }) }
                                }}></ListItem>
                            <ListItem
                                titleStyle={styles.listItem}
                                title='Contacts permissions'
                                hideChevron
                                switch={{
                                    trackColor: {
                                        false: 'white',
                                        true: 'red'
                                    },
                                    value: this.state.contacts,
                                    onChange: event => { this.setState({ contacts: !this.state.contacts }) }
                                }}></ListItem>
                            <Button
                                raised
                                containerStyle={{ marginBottom: 'auto' }}
                                title='Close'
                                buttonStyle={{
                                    backgroundColor: 'red'
                                }}
                                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                onPress={() => { this.setState({ isVisible: false }) }}></Button>
                        </View>
                    </Overlay>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.state.pictureLoaded ? this.state.newPicture : this.state.userProfileData.picture }}
                        borderColor='white'
                        borderWidth='5' />
                    <Text
                        style={styles.userInfoText}>
                        Name: {this.state.userName}
                    </Text>
                    <Text
                        style={styles.userInfoText}>
                        Nickname: {this.state.userProfileData.nickname}</Text>
                    <Text
                        style={styles.userInfoText}>
                        Email: {this.state.userProfileData.email_verified ? this.state.userProfileData.email : "No email detected"}</Text>
                    <Text
                        style={styles.userInfoText}>
                        Device info: {Constants.platform.ios.model}({Constants.deviceYearClass})</Text>
                </LinearGradient>
            </View>

        )
    }
}

export default ProfileScreen