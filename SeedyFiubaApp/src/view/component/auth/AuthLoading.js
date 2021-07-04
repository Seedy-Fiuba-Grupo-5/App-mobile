import React from "react";
import {ActivityIndicator} from "react-native-paper";
import {View} from "react-native";

const AuthLoading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center"
        }}>
            <ActivityIndicator size="large" color="#4b1e4d"/>
        </View>
    )
}
export default AuthLoading
