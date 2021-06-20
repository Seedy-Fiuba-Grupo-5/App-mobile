import React from 'react';
import {Alert, ScrollView, Text, View} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikButton from "./FormikButton";
import ApiProject from "../../../model/ApiProject";
import Icon from "react-native-vector-icons/FontAwesome5";
import GooglePlacePicker from "../GooglePlacePicker";
import styles from "../../Styles/StyleSheet";
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
        location: yup.string()
            .required('Please Enter A Location')
    });

    return(
        <ScrollView
            style={{
                paddingVertical:15,}
            }>
            <Formik initialValues={{
                location: ""}
            }
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        newProject(values);
                    }}>
                {props => (
                    <View>
                        <Text style={styles.labelText}>Location</Text>
                        <View
                            style={{
                                width: '75%',
                                alignSelf: 'center',
                                flexDirection: "row",
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                borderBottomWidth: 1,
                                flex: 1,
                                paddingVertical: 2,
                                borderColor: 'grey',
                            }}>
                            <Icon name={'map-marker-alt'} size={25} color={'black'}/>
                            <GooglePlacePicker formikProps={props}/>
                        </View>
                        <Text style={styles.errorText}>{props.touched.location && props.errors.location}</Text>
                        <FormikButton
                            title={"Create Project"}
                            formikProps={props}/>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}
export default FormikPatchTypeForm