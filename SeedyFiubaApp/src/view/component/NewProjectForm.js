import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View, AsyncStorage} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import FormikTextInput from "./Formik/FormikTextInput";
import FormikPicker from "./Formik/FormikPicker";
import FormikDatePicker from "./Formik/FormikDatePicker";
import FormikButton from "./Formik/FormikButton";
import icons from "../Styles/IconSheet";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../Styles/StyleSheet";
import GooglePlacePicker from "./GooglePlacePicker";
import ApiUser from "../../model/ApiUser";

const NewProjectForm = () => {

    const [datePickerShow, datePickerSetShow] = useState(false);
    const [userId, setUserId] = useState('');
    const showMessage = (message) => {
        Alert.alert(message)
    }

    useEffect(() => {
        AsyncStorage.getItem('userId', (err, result) => {
            setUserId(result.toString());
        });
    });

    const newProject = (project) =>{
        const apiUser = new ApiUser();
        apiUser.postProject(userId, project)
            .then((data) => {
                if(data){
                    showMessage('The Project Was Successfully Created');
                }
            })
            .catch((error) => {
                showMessage('Failed To Create Project')
            });
    }

    let projectSchema = yup.object({
        name: yup.string()
            .required('Please Enter A Project Name'),
        description: yup.string()
            .required('Please Enter A Project Description'),
        goal: yup.string()
            .required('Please Enter A Goal')
            .test('is-valid-num', 'Must Be At Least AR$ 100', (val) => {
                return parseInt(val) >= 100;
            }),
        type: yup.string()
            .required('Please Select A Project Type'),
        endDate: yup.string()
            .required('Please Select An End Date')
            .test('is-endDate-confirmed', 'Please Confirm An End Date', () => {
                return !datePickerShow
            }),
        hashtags: yup.string()
            .test('valid-hashtags', '' +
                'Please enter hashtags in format: #Hayasaka #ChisaSuperWaifu', (val) => {
                let hashtagsArray = String(val).split(" ")
                return validateHashtags(hashtagsArray)
            }),
        location: yup.string()
            .required('Please Enter A Location')
    });

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


    return(
        <View
            style={{
            paddingVertical:15}
            }>
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
                newProject(values);
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
                            <Icon name={'map-marker-alt'} size={24}/>
                            <GooglePlacePicker/>
                        </View>
                        <Text style={styles.errorText}>{props.touched.location && props.errors.location}</Text>
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