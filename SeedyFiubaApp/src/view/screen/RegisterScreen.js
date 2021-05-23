import React from "react";
import {Text, View} from "react-native";
const RegisterScreen = () => {
    return (
        <View style={
            {
                justifyContent:'center',
                flex:1
            }
        }>
            <Text style={
                {
                    alignSelf:'center',
                    padding:20
                }
            }>
                Register
            </Text>
        </View>
    )
}
export default RegisterScreen