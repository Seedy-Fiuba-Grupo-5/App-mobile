import {View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import React from "react";

const Loading = ({customStyle}) => {
    return (
        <View style={
            {
            flex: 1,
            justifyContent: "center",
            paddingTop:200,
                ...customStyle
            }
        }>
            <ActivityIndicator size="Large" color="#4b1e4d"/>
        </View>
    )
}

export default Loading