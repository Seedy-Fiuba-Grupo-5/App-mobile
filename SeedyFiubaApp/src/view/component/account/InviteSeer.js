import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {Icon, Input} from "react-native-elements";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import LoadingText from "../LoadingText";
import SeedyFiubaButton from "../SeedyFiubaButton";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import React, {useState} from "react";
import UseAuth from "../UseAuth";
import ApiUser from "../../../model/ApiUser";

const InviteSeer = ({project}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {jwt} = UseAuth();
    const inviteSeer = (values) => {
        setIsLoading(true);
        ApiUser.inviteSeer(project.id,values.id,jwt)
            .then((data) => {
                setIsLoading(false);
                console.log(data);
                Alert.alert('User invited');
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                switch (error.response.status){
                    case 404:{
                        Alert.alert('User not found');
                        break;
                    }
                    default:{
                        Alert.alert('Something went wrong');
                        break;
                    }
                }
            });
    }
    return(
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <Formik
                    initialValues={{
                        id: ''
                    }}
                    onSubmit={inviteSeer}
                    validationSchema={Yup.object({
                        id: Yup.string()
                            .min(1, 'Invalid user id')
                            .required('Required')
                    })}
                >
                    {props => (
                        <View>
                            <Text style={{paddingTop:1}}/>
                            <Input value={props.values.id}
                                   label={'User Id'}
                                   onChangeText={props.handleChange('id')}
                                   onBlur={props.handleBlur('id')}
                                   errorMessage={props.touched.id && props.errors.id}
                                   leftIcon={<Icon name='person-add'
                                                   type='material'
                                                   size={20}
                                                   color='#BEBEBE'/>}
                                   containerStyle={CreateProjectStyle.inputContainer}

                            />
                            {
                                isLoading?
                                    (<LoadingText/>):
                                    (<SeedyFiubaButton
                                        title='Invite'
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
export default InviteSeer