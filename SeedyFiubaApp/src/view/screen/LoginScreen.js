import React, {useContext, useEffect, useState} from "react";
import {Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import AuthButton from "../component/AuthButton";
import {Formik} from "formik";
import {Icon, Input} from "react-native-elements";
import * as Yup from 'yup';
import authStyle from "../Styles/AuthStyleSheet";
import UseAuth from "../component/UseAuth";
import AuthLoading from "../component/AuthLoading";
import {ANDROID_CLIENT} from '@env'
import * as Google from 'expo-google-app-auth';
import AuthText from "../component/AuthText";

const LoginScreen = ({navigation}) => {
    const {signIn,isLoading} = UseAuth();
    const signInHandler = (values, actions) => {
        signIn(values.email, values.password);
    }
    const signUpHandler = () => {
        navigation.navigate('Register');
    }


    const testGoogle = () => {
        const config = {
            androidClientId:ANDROID_CLIENT,
            scopes:['profile','email']
        }
        Google.logInAsync(config).then((results) => {
            console.log(results)
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log(isLoading);
    if(isLoading){
        return (<AuthLoading/>)
    }else{
        return (
            <ScrollView style={
                {
                    flex: 1,
                    flexDirection: 'column'
                }
            }  keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                                      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                    <Text style={authStyle.titleText}>
                        Welcome to SeedyFiuba
                    </Text>
                    <Image source={require('../images/logo.png')} style={{
                        width: 110,
                        height: 110,
                        alignSelf: "center",
                        margin: 10
                    }}/>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={signInHandler}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            password: Yup.string()
                                .min(6, 'Password is too short - should be 6 chars minimum.')
                                .required('Required')
                        })}
                    >
                        {props => (
                            <View>
                                <Input value={props.values.email}
                                       label={'Email'}
                                       onChangeText={props.handleChange('email')}
                                       onBlur={props.handleBlur('email')}
                                       errorMessage={props.touched.email && props.errors.email}
                                       leftIcon={<Icon name='mail-outline'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={authStyle.inputContainer}

                                />
                                <Input secureTextEntry={true}
                                       label={'Password'}
                                       value={props.values.password}
                                       onChangeText={props.handleChange('password')}
                                       errorMessage={props.touched.password && props.errors.password}
                                       leftIcon={<Icon name='lock-outline'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={authStyle.inputContainer}
                                />
                                <AuthButton title='Sign In' onPress={props.handleSubmit} style={authStyle.principalButton}/>
                            </View>
                        )
                        }
                    </Formik>
                    <AuthButton icon={<Icon
                        name='google'
                        style={{paddingRight:15}}
                        type='font-awesome-5'
                        size={25}
                        color='#4b1e4d'/>} title='Sign in with Google' onPress={testGoogle} style={authStyle.googleButton} titleStyle={authStyle.googleTitleButton}/>
                </KeyboardAvoidingView>
                <AuthText onPress={signUpHandler}/>
            </ScrollView>
        )
    }
}
export default LoginScreen