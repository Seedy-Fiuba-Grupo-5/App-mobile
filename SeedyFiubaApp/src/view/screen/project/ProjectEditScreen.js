import React, {useRef, useState} from "react";
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Header, Icon, Input} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import {Formik} from "formik";
import * as Yup from "yup";
import UseAuth from "../../component/UseAuth";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import ApiProject from "../../../model/ApiProject";
const ProjectEditScreen = ({navigation,route}) => {
    const {jwt,id} = UseAuth();
    const project = route.params.project;
    console.log(project);
    const updateProject = (values) => {
        ApiProject.updateProject(project.id,jwt,values)
            .then((data) => {
                Alert.alert('Information Edited');
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Something went wrong');
            });
    }
    const formRef = useRef([]);
    const validHashtag = (val) => {
        let hashtags = String(val).split(" ");
        let valid = true;
        hashtags.forEach((value,index,array) => {
            if (value.charAt(0) !== '#'){
                valid = false;
            }
        });
        return valid;
    }
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
                    Edit Project
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
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <Formik
                        enableReinitialize={true}
                        innerRef={formRef}
                        initialValues={{
                            name: project.name,
                            description: project.description,
                            hashtags:project.hashtags
                        }}
                        onSubmit={updateProject}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(3, 'Invalid project name length')
                                .required('Required'),
                            description: Yup.string()
                                .min(3, 'Invalid project description length')
                                .required('Required'),
                            hashtags: Yup.string().test('',
                                'Invalid project hashtags',(val) => {
                                    return validHashtag(val);
                                }).required('Required')
                        })}
                    >
                        {props => (
                            <View>
                                <Text style={{paddingTop:1}}/>
                                <Input value={props.values.name}
                                       label={'Name'}
                                       onChangeText={props.handleChange('name')}
                                       onBlur={props.handleBlur('name')}
                                       errorMessage={props.touched.name && props.errors.name}
                                       leftIcon={<Icon name='assignment'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}

                                />

                                <Input value={props.values.description}
                                       label={'Description'}
                                       onChangeText={props.handleChange('description')}
                                       onBlur={props.handleBlur('description')}
                                       multiline={true}
                                       errorMessage={props.touched.description && props.errors.description}
                                       leftIcon={<Icon name='article'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}
                                />

                                <Input value={props.values.hashtags}
                                       label={'Hashtags'}
                                       onChangeText={props.handleChange('hashtags')}
                                       onBlur={props.handleBlur('hashtags')}
                                       errorMessage={props.touched.hashtags && props.errors.hashtags}
                                       leftIcon={<Icon name='tag'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}/>
                            </View>
                        )
                        }
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default ProjectEditScreen