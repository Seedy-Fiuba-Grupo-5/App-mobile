import React from 'react';
import styles from "../../Styles/StyleSheet";
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
                value={props.formikProps[1]}
                selectedValue={props.formikProps[1]}
                onValueChange={props.formikProps[0].handleChange(props.formField)}
                items={[
                    { label: "Art", value: "Art" },
                    { label: "Comics", value: "Comics" },
                    { label: "Crafts", value: "Crafts" },
                    { label: "Dance", value: "Dance" },
                    { label: "Design", value: "Design" },
                    { label: "Fashion", value: "Fashion" },
                    { label: "Film & Video", value: "Film & Video" },
                    { label: "Food", value: "Food" },
                    { label: "Games", value: "Games" },
                    { label: "Journalism", value: "Journalism" },
                    { label: "Music", value: "Music" },
                    { label: "Photography", value: "Photography" },
                    { label: "Publishing", value: "Publishing" },
                    { label: "Technology", value: "Technology" },
                    { label: "Theater", value: "Theater" },
                    { label: "Other", value: "Other" },
                ]}
            />
            <Text style={styles.errorText}>{props.formikProps[2] && props.formikProps[3]}</Text>
        </>
    )
}
export default FormikPicker;