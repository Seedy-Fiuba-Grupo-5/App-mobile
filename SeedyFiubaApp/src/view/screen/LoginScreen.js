import React, {useContext} from "react";
import {Text, View} from "react-native";
import SeedyFiubaButton from "../component/SeedyFiubaButton";
import {Formik} from "formik";
import {Icon, Input} from "react-native-elements";
import * as Yup from 'yup';
import loginStyles from "../Styles/StyleLoginScreen";
import ApiUser from "../../model/ApiUser";
import AuthContext from "../component/AuthContext";

const LoginScreen = ({navigation}) => {
    const {signIn} = useContext(AuthContext);
    const signInHandler = (values,actions) => {
        const apiUser = new ApiUser();
        apiUser.login(values.email,values.password)
            .then((data) => {
                if(data){
                    signIn(data.id);
                }
            })
            .catch((error) => {});
    }
    const signUpHandler = () => {
        navigation.navigate('Register');
    }
    return (
        <View style={
            {
                justifyContent: 'center',
                flex: 1
            }
        }>
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
                        .min(8, 'Password is too short - should be 8 chars minimum.')
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
                               containerStyle={loginStyles.inputContainer}

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
                               containerStyle={loginStyles.inputContainer}
                        />
                        <SeedyFiubaButton title='Sign In' onPress={props.handleSubmit}/>
                    </View>
                )
                }
            </Formik>
            <Text
                style={
                    {
                        alignSelf: 'center',
                        fontSize: 14
                    }
                }>
                {'Dont have account?      '}
                <Text
                    onPress={signUpHandler}
                    style={{color:'#0828f1',textDecorationLine: 'underline'}
                    }>
                    {'Sign Up'}
                </Text>
            </Text>
        </View>
    )
}
export default LoginScreen