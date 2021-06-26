import React, {useCallback, useContext, useState} from "react";
import AuthContext from "./AuthContext";
import ApiUser from "../../model/ApiUser";
import {Alert} from "react-native";

const UseAuth = () => {
    const {jwt,id,setJWT,setId} = useContext(AuthContext);
    const [isLoading,setLoading] = useState(false);
    const signIn = useCallback((email, password) => {
        setLoading(true);
        ApiUser.login(email,password)
            .then((data) => {
                setLoading(false);
                setJWT(data.token);
                setId(data.id);
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
                    setJWT(data.token);
                    setId(data.id);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                if (error.response.status === 401) {
                    Alert.alert('Account with this email already exists');
                } else {
                    Alert.alert('Something went wrong ');
                }
            });

    },[])
    return {jwt,id,signIn,signOut,signUp,isLoading}
}

export default UseAuth