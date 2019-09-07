import React, { Component } from "react";
import { Platform, StyleSheet, Image, View, Text } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import TouchButton from '../components/button';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, { Circle, Rect } from 'react-native-svg';

const endpoint = 'https://exposed-app.herokuapp.com/';


function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            name: null,
            userLoginData: ""
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                paddingTop: Constants.statusBarHeight,
                backgroundColor: "#b0b0b0",
                marginRight: "2%",
                marginLeft: "2%"
            },
            headerTitle: (
                <Image style={{ width: 200, height: 30 }} source={require('../../assets/ExposedText.png')} className="AppLogo" alt="logo" />
            )
        };
    }
    _loginWithAuth0 = async () => {
        const auth0Domain = "https://dev-ph5frrsm.auth0.com/";
        const auth0ClientId = "RQrVtYsNqWFmQHu3oCb6wIzlPT272DDg";
        const redirectUrl = AuthSession.getRedirectUrl();
        const queryParams = toQueryString({
            client_id: auth0ClientId,
            redirect_uri: redirectUrl,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile email', // retrieve the user's profile
            nonce: 'nonce', // ideally, this will be a random value
        });
        let authUrl = `${auth0Domain}/authorize` + queryParams;

        console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
        console.log(`AuthURL is:  ${authUrl}`);
        const response = await AuthSession.startAsync({
            authUrl: authUrl
        });
        if (response.type === 'success') {
            this.handleResponse(response.params);
        }
    };
    handleResponse = (response) => {
        if (response.error) {
            Alert('Authentication error', response.error_description || 'something went wrong');
            return;
        }
        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log('user login data: ', decoded);
        this.setState({ userLoginData: decoded }, () => {
            this.goToNextPage();
            this.createUser(decoded);
        });

    }
    createUser = async decoded => {
        let user = {
            sub: decoded.sub,
            name: decoded.name,
            contacts: []
        };
        console.log("USer:", user);

        await fetch(endpoint + "users/create/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).catch(function (err) {
            console.log("Error:", err);
            return err;
        });
    };
    goToNextPage = () => {
        console.log('going to profile page');
        this.props.navigation.navigate("Profile", { userData: this.state.userLoginData });
    }
    render() {
        const theme = {
            colors: {
                primary: 'black',
            }
        }
        const styles = StyleSheet.create({
            App: {
                height: "200%",
                // paddingTop: Constants.statusBarHeight

            },
            container: {
                flex: 1,
            },
            AppLogo: {
                width: 425,
                height: 425
            },
            LoginButton: {
                width: 250,
                borderRadius: 25,
                borderBottomColor: "#522c2c",
                borderRightColor: "#522c2c",
                padding: 5,
                backgroundColor: "#852e2e",
                borderWidth: 2,
                borderColor: "#cc2525",
                color: 'white',
            },
            buttonText: {
                padding: 8,
                fontSize: 20,
                textAlign: 'center'
            }

        })
        return (
            <ThemeProvider theme={theme}>
                <View className="App" >
                    <LinearGradient
                        colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                        style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                        {/* <SvgAnimatedLinearGradient height={700}
                        width={700}
                        primaryColor="#db9c9c"
                        secondaryColor="#FF0000">

                        <Rect x="0" y="0" rx="0" ry="0" width="700" height="700" /> */}
                        <Image
                            source={require('../../assets/rawLogo.png')}
                            style={styles.AppLogo}
                            className="AppLogo" alt="logo" />
                        <TouchButton
                            style={styles.LoginButton}
                            buttonText={<Text style={styles.buttonText}>Login </Text>}
                            navigation={this.props.navigation}
                            onPress={this._loginWithAuth0}
                        />
                        {/* </SvgAnimatedLinearGradient> */}
                    </LinearGradient>
                </View>
            </ThemeProvider>
        );
    }
}
export default LoginScreen;