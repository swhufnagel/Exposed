import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, ListItem, Icon, } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import * as Contact from "expo-contacts";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';

class Contacts extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Contacts',
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
    constructor(props) {
        super(props)
        this.state = {
            contacts: null,
            permissions: false,
        }
    }
    async componentWillMount() {

    }
    permissionFlow = async () => {
        const { status } = await Permissions.askAsync(Permissions.CONTACTS);
        this.setState({ status: status });
        if (status !== "granted") {
            // console.log("status:", status);
            alert("You will need to enable contacts to use our app!");
            return;
        }
        //get data
        const { data } = await Contact.getContactsAsync({});
        this.setState({ contacts: data });
        this.setState({ permissions: true })

    };
    render() {
        const styles = StyleSheet.create({
            App: {
                height: "200%",

            },
            container: {
                flex: 1,
                paddingTop: Constants.statusBarHeight
            },
            photo: {
                height: 300,
                width: 300,
                borderRadius: 300 / 2
            },
            list: {
                width: "100%",
            },
            item: {
                borderRadius: 10,
                backgroundColor: 'transparent'
            },
            lock: {
                marginTop: "50%",
                textAlign: 'center'
            },
        })
        return (
            <View>
                <LinearGradient colors={['#FF0000', '#faa2a2', '#db9c9c', '#cc8585', '#d93f3f']}
                    style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
                    {this.state.permissions ? <ScrollView style={styles.list}>
                        {this.state.contacts.map((l, i) => (
                            <View key={i} >
                                <ListItem
                                    Component={TouchableScale}
                                    friction={90} //
                                    tension={100} // These props are passed to the parent component (here TouchableScale)
                                    activeScale={0.95} //
                                    key={l.id}
                                    title={l.name}
                                    subtitle={l.phoneNumbers[0].digits ?
                                        l.phoneNumbers[0].digits : "No number found"}
                                    name={l.name}
                                    bottomDivider={true}
                                    containerStyle={styles.item}
                                    titleStyle={{ color: 'black', fontWeight: '400', fontSize: '24' }}
                                    subtitleStyle={{ fontWeight: '200', fontSize: 18 }}
                                    leftAvatar={{
                                        source: {
                                            uri: this.state.contacts[i].imageAvailable ?
                                                this.state.contacts[i].image.uri :
                                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                        }
                                    }}
                                />
                            </View>

                        ))}
                    </ScrollView> :
                        <View>
                            <Entypo
                                name="lock"
                                size={100}
                                color="rgba(147, 147, 147, 0.52)"
                                onPress={this.permissionFlow}
                                style={styles.lock} />
                            <Text onPress={this.permissionFlow}>Click or shake to unlock</Text>
                        </View>
                    }

                </LinearGradient>
            </View>

        )
    }
}

export default Contacts;