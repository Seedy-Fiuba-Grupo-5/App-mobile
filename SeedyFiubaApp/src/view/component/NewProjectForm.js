import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements'
import {KeyboardAvoidingView, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ApiProject from "../../model/ApiProject";
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";
import * as yup from 'yup';
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "@react-native-community/datetimepicker";

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
                return !show
            }),
    });

    const [date, setDate] = useState(moment().add(8,'days').toDate());
    const [dateButtonText, setDateButtonText] = useState('Select an End Date...')
    const [dateTextStyle, setDateTextStyle] = useState(styles.placeholderText)
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        if (show){
            setShow(false);
            setDateButtonText(date.toDateString());
            setDateTextStyle(styles.enteredDataText);
        } else {
            setShow(true);
            setDateButtonText('Confirm End Date');
            setDateTextStyle(styles.placeholderText);
        }
    };

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
                               onBlur={props.handleBlur('name')}
                               errorMessage={props.touched.name && props.errors.name}/>

                        <Input label={"Project Description"}
                               placeholder='The most wholesome project'
                               multiline={true}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('description')}
                               value={props.values.description}
                               leftIcon={{ type: 'font-awesome-5', name: 'scroll' }}
                               onBlur={props.handleBlur('description')}
                               errorMessage={props.touched.description && props.errors.description}/>

                        <Input label={"Hashtags"}
                               placeholder='LEGENDARY'
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('hashtags')}
                               leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
                               value={props.values.hashtags}/>

                        <Text style={styles.labelText}>Project Type</Text>
                        <RNPickerSelect
                            Icon={() => {
                                return <Icon name="lightbulb" size={24} color="black" />;
                            }}
                            placeholder={{
                                label: 'Select a Project Type...',
                                value: "",
                            }}
                            onBlur={props.handleBlur('type')}
                            style={{ ...pickerStyle,
                                iconContainer: {
                                    top: 10,
                                    left:47,
                                },
                                placeholder: styles.placeholder,
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
                        <Text style={styles.errorText}>{props.touched.type && props.errors.type}</Text>

                        <Input label={"Goal"}
                               placeholder='125550'
                               keyboardType={'numeric'}
                               containerStyle={styles.formContainerStyle}
                               onChangeText={props.handleChange('goal')}
                               value={props.values.goal}
                               onBlur={props.handleBlur('goal')}
                               leftIcon={{ type: 'font-awesome', name: 'dollar' }}
                               errorMessage={props.touched.goal && props.errors.goal}/>

                        <Text style={styles.labelText}>End Date</Text>
                        <TouchableOpacity
                            onPress={showDatepicker}
                            style={styles.formOnTouchableOpacity}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start'
                                }}>
                                <Icon name={'calendar-week'} size={26}/>
                                <Text
                                    style={dateTextStyle}>
                                    {dateButtonText}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {show && (
                            <View>
                                <DateTimePickerModal
                                    testID="dateTimePicker"
                                    value={date}
                                    minimumDate={moment().add(8,'days').toDate()}
                                    mode={'date'}
                                    display="default"
                                    onChange={ (event, value) => {
                                        setDate(value);
                                        props.setFieldValue('endDate', value.toDateString());
                                    }}
                                />
                            </View>
                        )}
                        <Text style={styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>

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