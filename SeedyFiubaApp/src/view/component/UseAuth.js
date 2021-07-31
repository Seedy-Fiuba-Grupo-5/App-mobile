import React, {useCallback, useContext, useState} from "react";
import AuthContext from "./auth/AuthContext";
import ApiUser from "../../model/ApiUser";
import {Alert} from "react-native";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT} from '@env'
import UserInformation from "../../model/UserInformation";
import TokenNotification from "../../model/TokenNotification";

const saveUserData = (id, token) => {
    UserInformation.setData('user',
        {
            id:id,
            jwt:token
        })
        .then()
        .catch();
}

const UseAuth = () => {
    const {jwt,id,setJWT,setId} = useContext(AuthContext);
    const [isLoading,setLoading] = useState(false);

    const signInGoogle = useCallback( () => {
        const config = {
            androidClientId:ANDROID_CLIENT,
            scopes:['profile','email']
        }
        Google.logInAsync(config).then(async (results) => {
            if (results.type === 'success') {
                setLoading(true);
                let expoToken = await TokenNotification.getToken()
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        return 'empty_token'
                    });
                ApiUser.login(results.user.email, results.user.id,expoToken)
                    .then((data) => {
                        saveUserData(data.id, data.token);
                        setLoading(false);
                        setJWT(data.token);
                        setId(data.id);
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            signUp(
                                results.user.givenName,
                                results.user.familyName,
                                results.user.email,
                                results.user.id
                            );
                        }
                    });
            }
        }).catch((error) => {
            console.log(error);
        })
    },[]);

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
        },[]
    );

    const signIn = useCallback(async (email, password) => {
        setLoading(true);
        let expoToken = await TokenNotification.getToken()
            .then(data=>{return data;})
            .catch(error => {console.log(error); return 'IGNOREXPO'});
        ApiUser.login(email, password,expoToken)
            .then((data) => {
                saveUserData(data.id, data.token);
                setLoading(false);
                setJWT(data.token);
                setId(data.id);
            })
            .catch((error) => {
                setLoading(false);
                switch (error.response.status) {
                    case 401: {
                        Alert.alert('Invalid Password');
                        break;
                    }
                    case 404: {
                        Alert.alert('Account doesnt exist');
                        break;
                    }
                    default: {
                        Alert.alert('Something went wrong');
                        break;
                    }
                }
            });
    },[]);

    const signOut = useCallback(() => {
        setLoading(true);
        ApiUser.logout(id, jwt)
            .then((data) => {
                if (data) {
                    saveUserData(null, null);
                    setLoading(false);
                    setJWT(null);
                    setId(null);
                }
            })
            .catch((error) => {
                console.log(error.response.body);
                setLoading(false);
                saveUserData(null, null);
                setLoading(false);
                setJWT(null);
                setId(null);
            });
    },[]);

    const signUp = useCallback(async (firstName, lastName, email, password) => {
        setLoading(true);
        let expoToken = await TokenNotification.getToken()
            .then(data => {return data;})
            .catch(error => {console.log(error);return 'IGNOREXPO'});
        ApiUser.register(firstName, lastName, email, password,expoToken)
            .then((data) => {
                if (data) {
                    saveUserData(data.id, data.token);
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
    return {jwt,id,signIn,signOut,signUp,isLoading,signInGoogle,signOutGoogle}
}

export default UseAuth