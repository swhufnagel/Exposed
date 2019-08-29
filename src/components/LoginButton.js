import React, { Component } from "react";
import { Platform, StyleSheet } from 'react-native';
import { Button, ThemeProvider, colors, Divider, Input, Text } from 'react-native-elements';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
class LoginButton extends Component {
    state = {
        text: "",
        name: null,
        userLoginData: null
    }
    _loginWithAuth0 = async () => {
        const auth0Domain = "https://dev-ph5frrsm.auth0.com";
        const auth0ClientId = "Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
        const redirectUrl = AuthSession.getRedirectUrl();
        const queryParams = toQueryString({
            client_id: auth0ClientId,
            redirect_uri: redirectUrl,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile', // retrieve the user's profile
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

        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log('user login data: ', decoded);
        this.setState({ userLoginData: decoded });
    }
    render() {
        const theme = {
            colors: {
                primary: 'black',
            }
        }
        const styles = StyleSheet.create({
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
            }
        })
        return (
            <ThemeProvider theme={theme}>
                <Button raised style={styles.LoginButton} type="clear" title="Login Auth0?" navigation={this.props.navigation}
                    onPress={() => this._loginWithAuth0()} />
            </ThemeProvider>
        );
    }
}

export default LoginButton;