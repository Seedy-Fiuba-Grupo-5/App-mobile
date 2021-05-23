import React from 'react';
import styles from "../Styles/StyleSheet";
import RNPickerSelect from "react-native-picker-select";
import {Text} from "react-native";


const pickerStyle = {
    inputIOS: styles.pickerStyle,
    inputAndroid: styles.pickerStyle,
};

const FormikPicker = (props) => {

    return(
        <>
            <Text style={styles.labelText}>Project Type</Text>
            <RNPickerSelect
                Icon={props.icon}
                placeholder={{
                    label: props.label,
                    value: "",
                }}
                onBlur={props.formikProps[0].handleBlur(props.formField)}
                style={{ ...pickerStyle,
                    iconContainer: styles.pickerIconContainerStyle,
                    placeholder: styles.placeholder,
                }}
                selectedValue={props.formikProps[1]}
                onValueChange={props.formikProps[0].handleChange(props.formField)}
                items={[
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "TypeStript", value: "TypeStript" },
                    { label: "Python", value: "Python" },
                    { label: "Java", value: "Java" },
                    { label: "C++", value: "C++" },
                    { label: "C", value: "C" },
                ]}
            />
            <Text style={styles.errorText}>{props.formikProps[2] && props.formikProps[3]}</Text>
        </>
    )
}
export default FormikPicker;