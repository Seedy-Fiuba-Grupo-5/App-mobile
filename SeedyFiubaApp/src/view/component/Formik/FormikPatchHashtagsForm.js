import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View, AsyncStorage} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";
import FormikButton from "./FormikButton";
import icons from "../../Styles/IconSheet";
import ApiProject from "../../../model/ApiProject";

const FormikPatchNameForm = (props) => {

    const [label] = useState(props.label);

    const showMessage = (message) => {
        Alert.alert(message)
    }

    const newProject = (project) =>{
        ApiProject.updateProject(props.id, project)
            .then((data) => {
                props.setVisible(false);
                props.setValue(project.hashtags);
                showMessage('The Field Was Successfully Modified');
            })
            .catch((error) => {
                showMessage('Failed To Modified The Field')
            });
    }

    const validateHashtags = (hashtagsArray) => {
        let currentHashtag = 0
        let returnValue = true
        let currentValue
        while ((currentHashtag < hashtagsArray.length) && returnValue){
            currentValue = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g.test(hashtagsArray[currentHashtag])
            if (hashtagsArray[currentHashtag] === ""){
                currentValue =true
            }
            if (!currentValue) {
                returnValue = currentValue
            }
            currentHashtag = currentHashtag + 1
        }
        return returnValue
    }

    let projectSchema = yup.object({
        hashtags: yup.string()
            .test('valid-hashtags', '' +
                'Please enter hashtags in format: #Hayasaka #ChisaSuperWaifu', (val) => {
                let hashtagsArray = String(val).split(" ")
                return validateHashtags(hashtagsArray)
            }),
    });

    return(
        <View
            style={{
                width: '100%',
                paddingVertical:15}
            }>
            <Formik initialValues={ {hashtags: props.currentValue}}
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                        newProject(values);
                    }}>
                {props => (
                    <KeyboardAvoidingView behavior={'padding'}>
                        <FormikTextInput formikProps={[props, props.values.hashtags,
                            props.touched.hashtags, props.errors.hashtags]}
                                         formField={"hashtags"}
                                         label={label}
                                         placeholder={"LEGENDARY"}
                                         icon={icons.hashtags}
                                         keyboard={'default'}
                                         multiline={false}/>
                        <FormikButton
                            title={"Save"}
                            formikProps={props}/>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}
export default FormikPatchNameForm