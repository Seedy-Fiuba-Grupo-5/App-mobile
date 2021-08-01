import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {Icon, Input} from "react-native-elements";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import React, {useRef, useState} from "react";
import UseAuth from "../UseAuth";
import ApiProject from "../../../model/ApiProject";
import SeedyFiubaButton from "../SeedyFiubaButton";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import LoadingText from "../LoadingText";

const ProjectEdit = ({project, setProject})=>{
    const [isLoading, setIsLoading] = useState(false);
    const {jwt} = UseAuth();
    const updateProject = (values) => {
        setIsLoading(true);
        ApiProject.updateProject(project.id,jwt,values)
            .then((data) => {
                setIsLoading(false);
                setProject(oldProject => {
                    oldProject.name = data.name;
                    oldProject.description = data.description;
                    oldProject.hashtags = data.hashtags;
                    return oldProject;
                })
                Alert.alert('Information Edited');
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                Alert.alert('Something went wrong');
            });
    }
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
    return(
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <Formik
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
                            {
                                isLoading?
                                    (<LoadingText/>):
                                    (<SeedyFiubaButton
                                        title='Update'
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
export default ProjectEdit