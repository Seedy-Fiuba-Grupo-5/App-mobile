import React, {useCallback, useContext, useState} from "react";
import AuthContext from "./AuthContext";
import ApiUser from "../../model/ApiUser";
import {Alert, AsyncStorage} from "react-native";

const UseAuth = () => {
    const {jwt,setJWT} = useContext(AuthContext);
    const [isLoading,setLoading] = useState(false);
    const signIn = useCallback((email, password) => {
        setLoading(true);
        ApiUser.login(email,password)
            .then(async (data) => {
                setLoading(false);
                setJWT(data.id);
                console.log(data.id);
                try {
                    await AsyncStorage.setItem(
                        'userId',
                        data.id.toString()
                    );
                    console.log('exito');
                } catch (error) {
                    console.log('Error at saving ID')
                }
            })
            .catch((error) => {
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
            .then(async (data) => {
                if (data) {
                    setLoading(false);
                    setJWT(data.id);
                    try {
                        await AsyncStorage.setItem(
                            'userId',
                            data.id.toString()
                        );
                        console.log('exito');
                    } catch (error) {
                        console.log('Error at saving ID')
                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    Alert.alert('Account with this email already exists');
                } else {
                    Alert.alert('Something went wrong ');
                }
            });

    },[])
    return {jwt,signIn,signOut,signUp,isLoading}
}

export default UseAuth