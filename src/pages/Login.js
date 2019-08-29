import React, { Component } from "react";
import { Platform, StyleSheet, Image, View, Text } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
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
    _loginWithAuth0 = async () => {
        const auth0Domain = "https://dev-ph5frrsm.auth0.com";
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
        console.log('response ', response);
        if (response.type === 'success') {
            this.handleResponse(response.params);
        }
    };
    handleResponse = (response) => {
        if (response.error) {
            Alert('Authentication error', response.error_description || 'something went wrong');
            return;
        }
        console.log("response params ", response);
        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log('user login data: ', decoded);
        this.setState({ userLoginData: decoded }, () => {
            this.goToNextPage();
        });

    }
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
                height: "200%"
            },
            container: {
                flex: 1,
                paddingTop: Constants.statusBarHeight
            },
            AppLogo: {
                marginTop: "45%",
                width: 250,
                height: 250
            },
            LoginButton: {
                width: 250,
                marginTop: 130,
                borderRadius: 25,
                borderBottomColor: "#731c1c",
                borderRightColor: "#522c2c",
                padding: 5,
                backgroundColor: "#852e2e",
                borderWidth: 2,
                borderColor: "#cc2525",
                color: 'white',
            },

        })
        return (
            <ThemeProvider theme={theme}>
                <View style={styles.App} className="App" >
                    <LinearGradient
                        colors={['#FF0000', '#faa2a2', '#ff8c8c']}
                        style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                        <Image source={require('../../assets/rawLogo.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
                        <Button raised type="clear" title="Go to Next Page?" navigation={this.props.navigation}
                            onPress={() => this.goToNextPage()} />
                        <Button raised style={styles.LoginButton} type="clear" title="Login Auth0?" navigation={this.props.navigation}
                            onPress={() => this._loginWithAuth0()} />
                    </LinearGradient>
                </View>
            </ThemeProvider>
        );
    }
}
export default LoginScreen;