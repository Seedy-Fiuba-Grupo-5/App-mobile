import React from 'react';
import {Button, Input} from 'react-native-elements'
import {KeyboardAvoidingView, Text, ToastAndroid, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ApiProject from "../../model/ApiProject";
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as yup from 'yup';

const projectSchema = yup.object({
    name: yup.string()
        .required(),
    description: yup.string()
        .required(),
    goal: yup.string()
        .required()
        .test('is-valid-num', 'Must be at least AR$ 100', (val) => {
            return parseInt(val) >= 100;
        }),
});


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
            }
                    validationSchema={projectSchema}
                    onSubmit={(values, actions) => {
                actions.resetForm();
                newProject(values.name);
            }}>
                {props => (
                    <KeyboardAvoidingView behavior={'padding'}>
                        <Input label={"Project Name"}
                               placeholder="My Awesome Project"
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('name')}
                               value={props.values.name}
                               leftIcon={{ type: 'font-awesome-5', name: 'project-diagram' }}
                               errorMessage={props.errors.name}
                               renderErrorMessage={props.touched.name}/>

                        <Input label={"Project Description"}
                               placeholder='The most holesome project'
                               multiline={true}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('description')}
                               value={props.values.description}
                               leftIcon={{ type: 'font-awesome-5', name: 'scroll' }}
                               errorMessage={props.errors.description}
                               renderErrorMessage={props.touched.description}/>

                        <Input label={"Hashtags"}
                               placeholder='LEGENDARY'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('hashtags')}
                               leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
                               value={props.values.hashtags}/>

                        <Input label={"Proyect Type"}
                               placeholder='Awesome Type'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('type')}
                               leftIcon={{ type: 'font-awesome-5', name: 'lightbulb' }}
                               value={props.values.type}/>

                        <Input label={"Goal"}
                               placeholder='125550'
                               keyboardType={'numeric'}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('goal')}
                               value={props.values.goal}
                               leftIcon={{ type: 'font-awesome', name: 'dollar' }}
                               errorMessage={props.errors.goal}
                               renderErrorMessage={props.touched.goal}/>

                        <Input label={"End Date"}
                               placeholder='14/05/2022'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('endDate')}
                               leftIcon={{ type: 'font-awesome-5', name: 'calendar-week' }}
                               value={props.values.endDate}/>

                        <Input label={"Location"}
                               placeholder='Buenos Aires, Argentina'
                               autoFocus={true}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('location')}
                               leftIcon={{ type: 'font-awesome-5', name: 'map-marker-alt' }}
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