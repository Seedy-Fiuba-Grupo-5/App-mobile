import React, {useState} from 'react';
import {KeyboardAvoidingView, ToastAndroid, View} from "react-native";
import ApiProject from "../../model/ApiProject";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";
import FormikPicker from "./FormikPicker";
import FormikDatePicker from "./FormikDatePicker";
import FormikButton from "./FormikButton";
import icons from "../Styles/IconSheet";
import Icon from "react-native-vector-icons/FontAwesome5";

const NewProjectForm = (props) => {

    const [datePickerShow, datePickerSetShow] = useState(false);
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

    let projectSchema = yup.object({
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
        endDate: yup.string()
            .required()
            .test('is-endDate-confirmed', 'Please Confirm an End Date', () => {
                return !datePickerShow
            }),
    });

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
                        <FormikTextInput formikProps={[props, props.values.name,
                            props.touched.name, props.errors.name]}
                            formField={"name"}
                            label={"Project Name"}
                            placeholder={"My Awesome Project"}
                            icon={icons.project}
                            keyboard={'default'}
                            multiline={false}/>

                        <FormikTextInput formikProps={[props, props.values.description,
                            props.touched.description, props.errors.description]}
                                         formField={"description"}
                                         label={"Project Description"}
                                         placeholder={"The most wholesome project"}
                                         icon={icons.projectDescription}
                                         keyboard={'default'}
                                         multiline={true}/>

                        <FormikTextInput formikProps={[props, props.values.hashtags,
                               props.touched.hashtags, props.errors.hashtags]}
                                         formField={"hashtags"}
                                         label={"Hashtags"}
                                         placeholder={"LEGENDARY"}
                                         icon={icons.hashtags}
                                         keyboard={'default'}
                                         multiline={false}/>

                        <FormikPicker formikProps={[props, props.values.type,
                                props.touched.type, props.errors.type]}
                                formField={"type"}
                                label={"Select a Project Type..."}
                                icon={() => {
                                    return <Icon name="lightbulb" size={24} color="black" />;
                                }}/>

                        <FormikTextInput formikProps={[props, props.values.goal,
                            props.touched.goal, props.errors.goal]}
                                         formField={"goal"}
                                         label={"Goal"}
                                         placeholder={"1984"}
                                         icon={icons.goal}
                                         keyboard={'numeric'}
                                         multiline={false}/>

                        <FormikDatePicker formikProps={props}
                            show={[datePickerShow, datePickerSetShow]}/>

                        <FormikTextInput formikProps={[props, props.values.location,
                            props.touched.location, props.errors.location]}
                                         formField={"location"}
                                         label={"Location"}
                                         placeholder={"Buenos Aires, Argentina"}
                                         icon={icons.location}
                                         keyboard={'default'}
                                         multiline={false}/>

                        <FormikButton
                            title={"Create Project"}
                            formikProps={props}/>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}
export default NewProjectForm