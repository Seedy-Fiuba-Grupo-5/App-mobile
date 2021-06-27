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
                props.setValue(project.name);
                showMessage('The Field Was Successfully Modified');
            })
            .catch((error) => {
                showMessage('Failed To Modified The Field')
            });
    }

    let projectSchema = yup.object({
        name: yup.string()
            .required('Please Enter A Project Name'),
    });

    return(
        <View
            style={{
                width: '100%',
                paddingVertical:15}
            }>
            <Formik initialValues={ {name: props.currentValue}}
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                        newProject(values);
                    }}>
                {props => (
                    <KeyboardAvoidingView behavior={'padding'}>
                        <FormikTextInput formikProps={[props, props.values.name,
                            props.touched.name, props.errors.name]}
                                         formField={"name"}
                                         label={label}
                                         placeholder={"My Awesome Project"}
                                         icon={icons.project}
                                         keyboard={'default'}
                                         multiline={true}/>
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