import React from "react";
import {Text, View} from "react-native";
import SeedyFiubaButton from "../component/SeedyFiubaButton";

const LoginScreen = () => {
    const loginHandler = () =>{
        console.log('Login');
    }
    const registerHandler = ()=>{
        console.log('Register');
    }
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
                SeedyFiuba
            </Text>
            <SeedyFiubaButton title='Login' onPress={loginHandler}/>
            <SeedyFiubaButton title='Register' onPress={registerHandler}/>
        </View>
    )
}
export default LoginScreen