import React, { Component } from "react";
import { Platform, StyleSheet } from 'react-native';
import { Button, ThemeProvider, colors, Divider, Input, Text } from 'react-native-elements';

class ProfileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileGot: false,
            profileInfo: "",
        }
    }
    componentDidMount = () => {
        console.log(this.props);
    }
    render() {
        return (
            <Text>{this.state.profileGot ? "" : this.profileInfo}</Text>
        )
    }
}

export default ProfileInfo;