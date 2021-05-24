import React from "react";
import {Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import loginStyles from "../Styles/StyleLoginScreen";
import {Icon, Input} from "react-native-elements";
import SeedyFiubaButton from "../component/SeedyFiubaButton";
import ApiUser from "../../model/ApiUser";
const RegisterScreen = () => {
    const signUpHandler = (values,actions) => {
        const apiUser = new ApiUser();
        console.log(values);
        apiUser.register(values.firstName,values.lastName,values.email,values.password)
            .then((data) => {
                if(data){
                    console.log(data);
                }
            })
            .catch((error) => {});
        actions.resetForm();
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
                    password: Yup.string()
                        .min(6, 'Password is too short - should be 8 chars minimum.')
                        .required('Required')
                })}
            >
                {props => (
                    <View>
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
                    </View>
                )
                }
            </Formik>
        </View>
    )
}
export default RegisterScreen