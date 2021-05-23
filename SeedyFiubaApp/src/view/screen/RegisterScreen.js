import React from "react";
import {ScrollView, Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import loginStyles from "../Styles/StyleLoginScreen";
import {Icon, Input} from "react-native-elements";
import SeedyFiubaButton from "../component/SeedyFiubaButton";
const RegisterScreen = () => {
    const signUpHandler = (values) => {
        console.log(values)
    }
    return (
        <View
            style={
                {
                    justifyContent: 'center',
                    flex: 1,
                    marginTop:100
                }
            }>
            <Formik
                initialValues={{
                    firstName:'',
                    lastName:'',
                    email: '',
                    age:'',
                    password: '',

                }}
                onSubmit={signUpHandler}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .min(3,'Invalid First Name length')
                        .required('Required'),
                    lastName: Yup.string()
                        .min(3, 'Invalid Last Name length')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    age:Yup.number()
                        .min(18,'You must be of legal age')
                        .max(99,'You are very old'),
                    password: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .required('Required'),
                    repeatPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .required('Required')
                })}
            >
                {props => (
                    <ScrollView>
                        <Text style={loginStyles.textLabel}>
                            First Name
                        </Text>
                        <Input value={props.values.firstName}
                               onChangeText={props.handleChange('firstName')}
                               onBlur={props.handleBlur('firstName')}
                               errorMessage={props.touched.firstName && props.errors.firstName}
                               leftIcon={<Icon name='person-outline'
                                               type='material'
                                               size={20}
                                               color='#BEBEBE'/>}
                               containerStyle={loginStyles.inputContainer}

                        />
                        <Text style={loginStyles.textLabel}>
                            Last Name
                        </Text>
                        <Input value={props.values.lastName}
                               onChangeText={props.handleChange('lastName')}
                               errorMessage={props.touched.lastName && props.errors.lastName}
                               leftIcon={<Icon name='person-outline'
                                               type='material'
                                               size={20}
                                               color='#BEBEBE'/>}
                               containerStyle={loginStyles.inputContainer}
                        />
                        <Text style={loginStyles.textLabel}>
                            Email
                        </Text>
                        <Input value={props.values.email}
                               onChangeText={props.handleChange('email')}
                               onBlur={props.handleBlur('email')}
                               errorMessage={props.touched.email && props.errors.email}
                               leftIcon={<Icon name='mail-outline'
                                               type='material'
                                               size={20}
                                               color='#BEBEBE'/>}
                               containerStyle={loginStyles.inputContainer}

                        />
                        <Text style={loginStyles.textLabel}>
                            Age
                        </Text>
                        <Input value={props.values.age}
                               onChangeText={props.handleChange('age')}
                               keyboardType={'number-pad'}
                               onBlur={props.handleBlur('age')}
                               errorMessage={props.touched.age && props.errors.age}
                               leftIcon={<Icon name='cake'
                                               type='material'
                                               size={20}
                                               color='#BEBEBE'/>}
                               containerStyle={loginStyles.inputContainer}

                        />
                        <Text style={loginStyles.textLabel}>
                            Password
                        </Text>
                        <Input secureTextEntry={true}
                               value={props.values.password}
                               onChangeText={props.handleChange('password')}
                               errorMessage={props.touched.password && props.errors.password}
                               leftIcon={<Icon name='lock-outline'
                                               type='material'
                                               size={20}
                                               color='#BEBEBE'/>}
                               containerStyle={loginStyles.inputContainer}
                        />
                        <SeedyFiubaButton title='Sign Up' onPress={props.handleSubmit}/>
                    </ScrollView>
                )
                }
            </Formik>
        </View>
    )
}
export default RegisterScreen