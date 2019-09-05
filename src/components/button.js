import TouchableScale from 'react-native-touchable-scale';
import React, { Component } from "react";
import Text from 'react-native'
const Button = function (props) {
    return (
        <TouchableScale
            style={{
                width: 250,
                borderRadius: 25,
                borderBottomColor: "black",
                borderRightColor: "#522c2c",
                padding: 5,
                backgroundColor: "#852e2e",
                borderWidth: 2,
                borderColor: "#cc2525",
                color: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,

            }}
            onPress={props.onPress}
            friction={60} //
            tension={70} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.85}
        >
            {props.buttonText}
        </TouchableScale >
    );
};

export default Button;