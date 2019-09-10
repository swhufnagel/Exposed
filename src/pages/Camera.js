import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
const styles = StyleSheet.create({
    lock: {
        marginTop: "50%",
        textAlign: 'center'
    }
})
export default class CameraView extends React.Component {
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
            }, headerTitle: (
                <Image style={{ width: 200, height: 30 }} source={require('../../assets/ExposedText.png')} className="AppLogo" alt="logo" />
            ),
        }
    };
    state = {
        hasCameraPermission: false,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {

    }
    getCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    render() {
        if (this.state.hasCameraPermission === false) {
            return <View>
                <LinearGradient colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    <Entypo
                        name="lock"
                        size={100}
                        color="rgba(147, 147, 147, 0.52)"
                        onPress={this.getCamera}
                        style={styles.lock} />
                    <Text onPress={this.getCamera}>Click or shake to unlock</Text>
                </LinearGradient>
            </View>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                    >
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
                </View>
            );
        }
    }
}