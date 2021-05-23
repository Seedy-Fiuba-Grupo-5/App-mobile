import React from 'react';
import {Button} from 'react-native-elements'
import styles from "../Styles/StyleSheet";

const FormikButton  = (props) => {
    return(
        <>
            <Button title={props.title}
                    buttonStyle={styles.button}
                    titleStyle={styles.formButtonTitle}
                    onPress={props.formikProps.handleSubmit}
            />
        </>
    )
}
export default FormikButton;