import React from 'react';
import {Button, Input} from 'react-native-elements'
import {KeyboardAvoidingView, ToastAndroid, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ApiProject from "../../model/ApiProject";
import { Formik } from 'formik';

const NewProjectForm = (props) => {
    const showMessage = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const newProject = (projectName) =>{
        if(projectName){
            const apiProjects = new ApiProject();
            apiProjects.post(projectName)
                .then((data) => {
                    if(data){
                        showMessage("Project Create");
                    }
                })
                .catch((error) => {});
        }
    }
    return(
        <View>
            <Formik initialValues={{
                name: "",
                description: "",
                hashtags: "",
                type: "",
                goal: "",
                endDate: "",
                location: ""}
            } onSubmit={(values, actions) => {
                actions.resetForm();
                newProject(values.name);
            }}>
                {props => (
                    <KeyboardAvoidingView behavior={'padding'}>
                        <Input label={"Project Name"}
                               placeholder="My Awesome Project"
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('name')}
                               value={props.values.name}/>


                        <Input label={"Project Description"}
                               placeholder='The most holesome project'
                               multiline={true}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('description')}
                               value={props.values.description}/>

                        <Input label={"Hashtags"}
                               placeholder='#LEGENDARY'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('hashtags')}
                               value={props.values.hashtags}/>

                        <Input label={"Proyect Type"}
                               placeholder='Awesome Type'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('type')}
                               value={props.values.type}/>

                        <Input label={"Goal"}
                               placeholder='$125550'
                               keyboardType={'numeric'}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('goal')}
                               value={props.values.goal}/>

                        <Input label={"End Date"}
                               placeholder='14/05/2022'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('endDate')}
                               value={props.values.endDate}/>

                        <Input label={"Location"}
                               placeholder='Buenos Aires, Argentina'
                               autoFocus={true}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('location')}
                               value={props.values.location}/>

                        <Button title="Create Project"
                                buttonStyle={styles.button}
                                titleStyle={
                                    {
                                        fontSize: 20
                                    }
                                }
                                onPress={props.handleSubmit}
                        />
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}
export default NewProjectForm