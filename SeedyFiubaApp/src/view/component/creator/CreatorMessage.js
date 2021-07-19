import {KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {Icon, Input} from "react-native-elements";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import LoadingText from "../LoadingText";
import SeedyFiubaButton from "../SeedyFiubaButton";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import React, {useState} from "react";

const CreatorMessage = () => {
    const [isLoading, setIsLoading] = useState(false);
    return(
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <Formik
                    initialValues={{
                        message:''
                    }}
                    onSubmit={()=>{}}
                    validationSchema={Yup.object({
                        message: Yup.string()
                            .min(200, 'Invalid message length')
                            .required('Required')
                    })}
                >
                    {props => (
                        <View>
                            <Text style={{paddingTop:1}}/>
                            <Input value={props.values.message}
                                   label={'Message'}
                                   onChangeText={props.handleChange('message')}
                                   onBlur={props.handleBlur('message')}
                                   multiline={true}
                                   errorMessage={props.touched.message && props.errors.message}
                                   leftIcon={<Icon name='textsms'
                                                   type='material'
                                                   size={20}
                                                   color='#BEBEBE'/>}
                                   containerStyle={CreateProjectStyle.inputContainer}

                            />
                            {
                                isLoading?
                                    (<LoadingText/>):
                                    (<SeedyFiubaButton
                                        title='Send'
                                        onPress={props.handleSubmit}
                                        style={ProjectEditStyleSheet.button}
                                        titleStyle={ProjectEditStyleSheet.title}
                                    />)
                            }
                        </View>
                    )
                    }
                </Formik>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default CreatorMessage