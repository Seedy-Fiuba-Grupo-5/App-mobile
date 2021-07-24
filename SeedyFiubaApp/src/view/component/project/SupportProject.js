import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Formik, isNaN} from "formik";
import * as Yup from "yup";
import {Icon, Input} from "react-native-elements";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import LoadingText from "../LoadingText";
import SeedyFiubaButton from "../SeedyFiubaButton";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import React, {useState} from "react";
import UseAuth from "../UseAuth";
import ApiProject from "../../../model/ApiProject";

const SupportProject = ({projectId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {id,jwt} = UseAuth();
    const validAmount = (val) => {
        let fVal = parseFloat(val);
        if (isNaN(fVal)) {
            return false;
        }
        return fVal >= 0.001;

    }
    const supportProject = (values,actions) => {
        actions.resetForm();
        setIsLoading(true);
        console.log(jwt);
        ApiProject.supportProject(projectId, jwt, id, values.amount)
            .then((data)=>{
                setIsLoading(false);
                console.log(data);
                Alert.alert('Successfully Supported');
            })
            .catch((error)=>{
                setIsLoading(false);
                console.log(error);
            })
    }
    return(
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <Formik
                    initialValues={{
                        amount: ''
                    }}
                    onSubmit={supportProject}
                    validationSchema={Yup.object({
                        amount: Yup.string().test('',
                            'Invalid amount',(val) => {
                                return validAmount(val);
                            }).required('Required'),
                    })}
                >
                    {props => (
                        <View>
                            <Text style={{paddingTop:1}}/>
                            <Input value={props.values.amount}
                                   label={'Amount'}
                                   onChangeText={props.handleChange('amount')}
                                   onBlur={props.handleBlur('amount')}
                                   errorMessage={props.touched.amount && props.errors.amount}
                                   leftIcon={<Icon name='money'
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
export default SupportProject