import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, View} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikButton from "./FormikButton";
import ApiProject from "../../../model/ApiProject";
import FormikPicker from "./FormikPicker";
import Icon from "react-native-vector-icons/FontAwesome5";

const FormikPatchTypeForm = (props) => {

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
        type: yup.string()
            .required('Please Select A Project Type'),
    });

    return(
        <View
            style={{
                width: '100%',
                paddingVertical:15}
            }>
            <Formik initialValues={ {type: props.currentValue}}
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                        newProject(values);
                    }}>
                {props => (
                    <KeyboardAvoidingView behavior={'padding'}>
                        <FormikPicker formikProps={[props, props.values.type,
                            props.touched.type, props.errors.type]}
                                      formField={"type"}
                                      label={"Select a Project Type..."}
                                      icon={() => {
                                          return <Icon name="lightbulb" size={24} color="black" />;
                                      }}/>
                        <FormikButton title={"Save"}
                            formikProps={props}/>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}
export default FormikPatchTypeForm