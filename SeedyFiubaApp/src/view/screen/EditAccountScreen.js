import React, {useRef} from "react";
import {KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Header, Icon, Input} from "react-native-elements";
import accountStyles from "../Styles/AccountStyleSheet";
import authStyle from "../Styles/AuthStyleSheet";
import {Formik} from "formik";
import * as Yup from "yup";
const EditAccountScreen = ({navigation}) => {
    const formRef = useRef();
    return (
        <View style={{flex: 1, alignContent: 'center'}}>
            <Header
                leftComponent={<Icon
                    name='close'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        navigation.goBack();
                    }}/>}
                centerComponent={<Text style={accountStyles.text}>
                    Edit Account
                </Text>}
                rightComponent={<Icon
                    name='done'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        if (formRef.current) {
                            formRef.current.handleSubmit();
                        }
                    }}/>}
                containerStyle={accountStyles.header}
            />
            <ScrollView
                keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <Formik
                        innerRef={formRef}
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                        }}
                        onSubmit={()=>{console.log('Holaaaa')}}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .min(3, 'Invalid First Name length'),
                            lastName: Yup.string()
                                .min(3, 'Invalid Last Name length'),
                            email: Yup.string()
                                .email('Invalid email address')
                        })}
                    >
                        {props => (
                            <View style={
                                {
                                    flexDirection: 'column',
                                    marginTop:100
                                }
                            }>
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
                            </View>
                        )
                        }
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default EditAccountScreen