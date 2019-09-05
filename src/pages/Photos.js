import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, CameraRoll, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import GridList from 'react-native-grid-list';

class Photos extends React.Component {
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
            permission: false,
            status: false,
            photoUris: null,
        }
    }

    getPhotos = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let photos = await CameraRoll.getPhotos({ first: 10, assetType: "All", groupTypes: "All" });
        this.setState({ photos }, () => {
            // console.log("testing ", photos.edges[0].node.image.uri);
            let photoUris = photos.edges.map((photo, i) => {
            })
            this.setState({ photoUris });
            console.log("photos", photoUris);
        });
        return photos;
    }
    _renderPhotos(photos) {
        let images = [];
        for (let { node: photo } of photos.edges) {
            images.push(
                <Image
                    source={photo.image}
                    resizeMode="contain"
                    style={{ height: 100, width: 100, resizeMode: 'contain' }}
                />
            );
        }
        return images;
    }
    renderItemAnimationAndSeparator = ({ item, animation }) => (
        <Image
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
            }}
            source={item.thumbnail}
            onLoad={() => animation.start()}
        />
    );
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
                height: "100%",
                width: "100%",
                borderRadius: 300 / 2,
            },
            gridAnimationAndSeparator: {
                backgroundColor: 'transparent',
                width: 300
            },
            gridList: {
                width: '100%'
            },
            container: {
                flex: 1,
                margin: '5%',
            },
            imageRadius: {
                width: '100%',
                height: '100%',
                borderRadius: 10,
            },
            image: {
                width: '100%',
                height: '100%',
            },
        });

        const image = photoUris => ({
            thumbnail: {
                uri: photoUris.map((photoUri, i) => {
                    console.log(photoUri)
                    // photoUri
                }),
            },
        });
        const itemsAnimationAndSeparator = Array.from(Array(5)).map((_, index) =>
            image(index),
        );
        return (
            <View>
                <LinearGradient colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    {this.state.photos ? <ScrollView style={styles.container}>
                        {/* {this._renderPhotos(this.state.photos)} */}
                        <View style={styles.gridAnimationAndSeparator}>
                            <GridList
                                style={styles.gridList}
                                showAnimation
                                showSeparator
                                data={itemsAnimationAndSeparator}
                                numColumns={3}
                                renderItem={this.renderItemAnimationAndSeparator}
                                separatorBorderWidth={10}
                                separatorBorderColor={'transparent'}
                                animationInitialBackgroundColor={'transparent'}
                            />
                        </View>
                    </ScrollView> :
                        <Button title="Click to Unlock Photos" onPress={this.getPhotos} />
                    }
                </LinearGradient>
            </View>

        )
    }
}

export default Photos;