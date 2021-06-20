import React, {useContext, useState} from "react";
import {Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import AuthButton from "../component/AuthButton";
import {Formik} from "formik";
import {Icon, Input} from "react-native-elements";
import * as Yup from 'yup';
import authStyle from "../Styles/AuthStyleSheet";
import UseAuth from "../component/UseAuth";
import AuthLoading from "../component/AuthLoading";

const LoginScreen = ({navigation}) => {
    const {signIn,isLoading} = UseAuth();
    const signInHandler = (values, actions) => {
        signIn(values.email, values.password);
    }
    const signUpHandler = () => {
        navigation.navigate('Register');
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
                        width: 130,
                        height: 130,
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
                    <AuthButton title='Sign Up' onPress={signUpHandler} style={authStyle.secondButton}/>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}
export default LoginScreen