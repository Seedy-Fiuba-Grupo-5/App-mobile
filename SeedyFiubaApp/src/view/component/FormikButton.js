import React from 'react';
import {Button} from 'react-native-elements'
import styles from "../Styles/StyleSheet";
import {View} from "react-native";

const FormikButton  = (props) => {
    return(
        <>
            <View
                style={{
                    paddingTop: 7,
                }}>
                <Button title={props.title}
                        buttonStyle={styles.button}
                        titleStyle={styles.formButtonTitle}
                        onPress={props.formikProps.handleSubmit}
                />
            </View>

        </>
    )
}
export default FormikButton;