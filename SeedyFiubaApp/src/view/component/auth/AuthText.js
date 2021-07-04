import React from "react";
import {Text} from "react-native";
const AuthText = ({onPress})=>{
    return (
        <Text style={{
            alignSelf: 'center',
            paddingTop:10
        }}>
            Don't have an account?  {<Text onPress={onPress} style={{color:'blue'}}>Sign Up</Text>}
        </Text>
    )
}
export default AuthText