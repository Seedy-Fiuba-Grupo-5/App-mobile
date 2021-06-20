import React from 'react';
import {Input} from 'react-native-elements'
import styles from "../../Styles/StyleSheet";

const FormikTextInput  = (props) => {
    // FormikProps vec =[props, props.values.name, props.touched.name, props.errors.name]
    return(
        <>
            <Input label= {props.label}
                   placeholder= {props.placeholder}
                   containerStyle={styles.formContainerStyle}
                   onChangeText={props.formikProps[0].handleChange(props.formField)}
                   value={props.formikProps[1]}
                   leftIcon={props.icon}
                   keyboardType={props.keyboard}
                   multiline={props.multiline}
                   onBlur={props.formikProps[0].handleBlur(props.formField)}
                   errorMessage={props.formikProps[2] && props.formikProps[3]}/>
        </>
    )
}
export default FormikTextInput;