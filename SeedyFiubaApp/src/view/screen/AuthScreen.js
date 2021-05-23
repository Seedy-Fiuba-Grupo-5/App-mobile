import {Text, View} from "react-native";
import SeedyFiubaButton from "../component/SeedyFiubaButton";
import React from "react";

const AuthScreen = ({navigation}) => {
    const loginHandler = () =>{
        console.log('Login');
        navigation.navigate('Login');

    }
    const registerHandler = ()=>{
        console.log('Register');
        navigation.navigate('Register');
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
export default AuthScreen