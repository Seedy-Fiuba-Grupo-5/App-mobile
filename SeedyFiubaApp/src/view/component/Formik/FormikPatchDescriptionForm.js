import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View, AsyncStorage, ScrollView} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";
import FormikButton from "./FormikButton";
import icons from "../../Styles/IconSheet";
import ApiProject from "../../../model/ApiProject";

const FormikPatchDescriptionForm = (props) => {

    const [label] = useState(props.label);

    const showMessage = (message) => {
        Alert.alert(message)
    }

    const newProject = (project) =>{
        const apiProject = new ApiProject();
        apiProject.patch(props.id, project)
            .then((data) => {
                showMessage('The Field Was Successfully Modified');
            })
            .catch((error) => {
                showMessage('Failed To Modified The Field')
            });
    }

    let projectSchema = yup.object({
        description: yup.string()
            .required('Please Enter A Project Description'),
    });

    return(
        <View
            style={{
                width: '100%',
                paddingVertical:15}
            }>
            <Formik initialValues={ {description: props.currentValue}}
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                        newProject(values);
                    }}>
                {props => (
                    <ScrollView behavior={'padding'}>
                        <FormikTextInput formikProps={[props, props.values.description,
                            props.touched.description, props.errors.description]}
                                         formField={"description"}
                                         label={label}
                                         placeholder={"My Awesome Project"}
                                         icon={icons.project}
                                         keyboard={'default'}
                                         multiline={true}/>
                        <FormikButton
                            title={"Save"}
                            formikProps={props}/>
                    </ScrollView>
                )}
            </Formik>
        </View>
    )
}
export default FormikPatchDescriptionForm