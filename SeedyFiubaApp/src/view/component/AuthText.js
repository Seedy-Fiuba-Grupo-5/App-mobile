import React from "react";
import {Text} from "react-native";
const AuthText = ({onPress})=>{
    return (
        <Text style={{
            alignSelf: 'center',
            paddingTop:20
        }}>
            Don't have account?  {<Text onPress={onPress} style={{color:'blue'}}>Sign Up</Text>}
        </Text>
    )
}
export default AuthText