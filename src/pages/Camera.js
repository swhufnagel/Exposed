import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class Photos extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Camera',
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
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {

        const styles = StyleSheet.create({
            App: {
                height: "200%",
                paddingTop: Constants.statusBarHeight

            },
            container: {
                flex: 1,
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
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View >
            );
        }
    }
}

export default Photos;