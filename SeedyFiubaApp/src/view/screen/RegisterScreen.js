import React, {useContext} from "react";
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import authStyle from "../Styles/AuthStyleSheet";
import {Icon, Input} from "react-native-elements";
import AuthButton from "../component/AuthButton";
import ApiUser from "../../model/ApiUser";
import UseAuth from "../component/UseAuth";

const RegisterScreen = () => {
    const {signUp} = UseAuth();
    const signUpHandler = (values, actions) => {
        ApiUser.register(values.firstName, values.lastName, values.email, values.password)
            .then((data) => {
                if (data) {
                    signUp(data.id);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    Alert.alert('Account with this email already exists');
                } else {
                    Alert.alert('Something went wrong ');
                }
            });
    }
    return (
        <ScrollView
            style={
                {
                    flex: 1,
                    flexDirection: 'column',
                    alignContent: "center"
                }
            }
            keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <Text style={authStyle.titleText}>
                    Create Account
                </Text>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    }}
                    onSubmit={signUpHandler}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .min(3, 'Invalid First Name length')
                            .required('Required'),
                        lastName: Yup.string()
                            .min(3, 'Invalid Last Name length')
                            .required('Required'),
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
                            <Input value={props.values.firstName}
                                   label={'First Name'}
                                   onChangeText={props.handleChange('firstName')}
                                   onBlur={props.handleBlur('firstName')}
                                   errorMessage={props.touched.firstName && props.errors.firstName}
                                   leftIcon={<Icon name='person-outline'
                                                   type='material'
                                                   size={20}
                                                   color='#BEBEBE'/>}
                                   containerStyle={authStyle.inputContainer}

                            />
                            <Input value={props.values.lastName}
                                   label={'Last Name'}
                                   onChangeText={props.handleChange('lastName')}
                                   onBlur={props.handleBlur('lastName')}
                                   errorMessage={props.touched.lastName && props.errors.lastName}
                                   leftIcon={<Icon name='person-outline'
                                                   type='material'
                                                   size={20}
                                                   color='#BEBEBE'/>}
                                   containerStyle={authStyle.inputContainer}
                            />
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
                                   value={props.values.password}
                                   label={'Password'}
                                   onChangeText={props.handleChange('password')}
                                   errorMessage={props.touched.password && props.errors.password}
                                   leftIcon={<Icon name='lock-outline'
                                                   type='material'
                                                   size={20}
                                                   color='#BEBEBE'/>}
                                   containerStyle={authStyle.inputContainer}
                            />
                            <AuthButton title='Sign Up' onPress={props.handleSubmit}
                                        style={authStyle.principalButton}/>
                        </View>
                    )
                    }
                </Formik>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default RegisterScreen