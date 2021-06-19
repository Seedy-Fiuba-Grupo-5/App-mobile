import React, {useCallback, useContext, useState} from "react";
import AuthContext from "./AuthContext";
import ApiUser from "../../model/ApiUser";
import {Alert} from "react-native";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT} from '@env'

const UseAuth = () => {
    const {jwt,google,setJWT,setGoogle} = useContext(AuthContext);
    const [isLoading,setLoading] = useState(false);

    const signInGoogle = useCallback( () => {
        /*const config = {
            androidClientId:ANDROID_CLIENT,
            scopes:['profile','email']
        }
        Google.logInAsync(config).then((results) => {
            console.log(results)
        }).catch((error) => {
            console.log(error)
        })*/
        setGoogle(true);
        setJWT('1');
    },[] );

    const signOutGoogle = useCallback(
        () => {
            /*const config = {
                androidClientId:ANDROID_CLIENT,
                scopes:['profile','email']
            }
            Google.logInAsync(config).then((results) => {
                console.log(results)
            }).catch((error) => {
                console.log(error)
            })*/
            setGoogle(false);
            setJWT(null);
        },[]
    );

    const signIn = useCallback((email, password) => {
        setLoading(true);
        ApiUser.login(email,password)
            .then((data) => {
                setLoading(false);
                setJWT(data.id);
            })
            .catch((error) => {
                setLoading(false);
                switch (error.response.status){
                    case 401:{
                        Alert.alert('Invalid Password');
                        break;
                    }
                    case 404:{
                        Alert.alert('Account doesnt exist');
                        break;
                    }
                    default:{
                        Alert.alert('Something went wrong');
                        break;
                    }
                }
            });
    },[])
    const signOut = useCallback(() => {
        setJWT(null);
    },[])
    const signUp = useCallback((firstName, lastName, email, password) => {
        setLoading(true);
        ApiUser.register(firstName, lastName, email, password)
            .then((data) => {
                if (data) {
                    setLoading(false);
                    setJWT(data.id);
                }
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 401) {
                    Alert.alert('Account with this email already exists');
                } else {
                    Alert.alert('Something went wrong ');
                }
            });

    },[])
    return {jwt,signIn,signOut,signInGoogle,signOutGoogle,signUp,isLoading,google}
}

export default UseAuth