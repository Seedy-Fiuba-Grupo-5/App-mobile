import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements'
import {KeyboardAvoidingView, Text, ToastAndroid, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ApiProject from "../../model/ApiProject";
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as yup from 'yup';
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";

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
    type: yup.string()
        .required(),
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

    const pickerStyle = {
        inputIOS: styles.pickerStyle,
        inputAndroid: styles.pickerStyle,
    };
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
                        <Text style={styles.labelText}>Proyect Type</Text>
                        <RNPickerSelect
                            Icon={() => {
                                return <Icon name="lightbulb" size={24} color="black" />;
                            }}
                            placeholder={{
                                label: 'Select a Proyect Type...',
                                value: "",
                            }}

                            style={{ ...pickerStyle,
                                iconContainer: {
                                    top: 10,
                                    left:47,
                                },
                                placeholder: {
                                    color: "#86939e",
                                    fontSize: 18,
                                },
                            }}
                            selectedValue={props.values.type}
                            onValueChange={props.handleChange('type')}
                            items={[
                                { label: "JavaScript", value: "JavaScript" },
                                { label: "TypeStript", value: "TypeStript" },
                                { label: "Python", value: "Python" },
                                { label: "Java", value: "Java" },
                                { label: "C++", value: "C++" },
                                { label: "C", value: "C" },
                            ]}
                        />
                        <Text style={styles.errorText}>{props.errors.type}</Text>

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