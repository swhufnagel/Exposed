import React, { PureComponent } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, CameraRoll, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import GridList from 'react-native-grid-list';
import { Entypo } from '@expo/vector-icons';

export default class Photos extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Photos',
            headerStyle: {
                backgroundColor: '#b0b0b0',
                marginRight: "2%",
                marginLeft: "2%"
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: (
                <Image style={{ width: 200, height: 30 }} source={require('../../assets/ExposedText.png')} className="AppLogo" alt="logo" />
            ),

        }
    };
    constructor(props) {
        super(props)
        this.state = {
            photos: null,
            loaded: false,
            status: false,
            photoUris: null,
        }
    }
    async componentDidMount() {
        this.getPhotos();
    }
    getPhotos = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let photos = await CameraRoll.getPhotos({ first: 10, assetType: "All", groupTypes: "All" });
        let newPhotoUris = [];
        let photoUris = await photos.edges.map((photo, i) => {
            photo = photo.node.image.uri;
            newPhotoUris.push(photo);
        })
        this.setState({ photoUris: newPhotoUris }, () => {
            this.makeRenderable();
        })
    }
    makeRenderable = () => {
        let photoUris = this.state.photoUris;
        let newNew = [];
        let newPhotoUris = photoUris.map((uri, i) => {
            uri = { thumbnail: { uri: uri } };
            newNew.push(uri);
        })
        this.setState({ photoUris: newNew }, () => {
            this.setState({ loaded: true })
        })
    }
    renderItem = ({ item, animation }) => (
        <Image
            style={styles.image}
            source={item.thumbnail}
            onLoad={() => animation.start()}
        />
    );
    render() {

        return (
            <View>
                <LinearGradient colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    {this.state.loaded ? <ScrollView style={styles.container}>
                        <View style={styles.container}>
                            <GridList
                                separatorBorderWidth={10}
                                separatorBorderColor={'transparent'}
                                animationInitialBackgroundColor={'transparent'}
                                style={styles.gridList}
                                showAnimation
                                data={this.state.photoUris}
                                numColumns={3}
                                renderItem={this.renderItem}
                            >
                            </GridList>
                        </View>
                    </ScrollView> :
                        <View>
                            <Entypo
                                name="lock"
                                size={100}
                                color="rgba(147, 147, 147, 0.52)"
                                onPress={this.getPhotos}
                                style={styles.lock} />
                            <Text onPress={this.getPhotos}>Click or shake to unlock</Text>
                        </View>
                    }
                </LinearGradient>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    App: {
        height: '200%',
        backgroundColor: 'black'
    },
    lock: {
        marginTop: "50%",
        textAlign: 'center'
    },
    container: {
        width: '100%',

    },
    gridList: {
        marginTop: '5%',
        marginLeft: '2.5%',
        backgroundColor: 'transparent'
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
});