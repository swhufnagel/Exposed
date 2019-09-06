import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
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
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    detectFaces = async imageUri => {
        const options = { mode: FaceDetector.Constants.Mode.fast };
        return await FaceDetector.detectFacesAsync(imageUri, options);
    };
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <View>
                <Entypo
                    name="lock"
                    size={100}
                    color="rgba(147, 147, 147, 0.52)"
                    onPress={this.getPhotos}
                    style={styles.lock} />
                <Text onPress={this.getPhotos}>Click or shake to unlock</Text>
            </View>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                        onFacesDetected={this.handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.none,
                            runClassifications: FaceDetector.Constants.Classifications.none,
                            minDetectionInterval: 100,
                            tracking: true
                        }}>
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