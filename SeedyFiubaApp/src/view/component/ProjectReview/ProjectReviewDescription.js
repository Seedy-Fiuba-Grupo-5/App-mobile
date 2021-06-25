import React, {useState} from "react";
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from "react-native";
import ApiProject from "../../../model/ApiProject";
import styles from "../../Styles/StyleSheet";
import {Overlay} from "react-native-elements";
import FormikPatchDescriptionForm from "../Formik/FormikPatchDescriptionForm";

const ProjectReviewDescription = (props) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        ApiProject.project(props.id).then((data) => {
            setValue(data.description);
        })
    }
    return (
        <>
            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                toggleOverlay();
            }}>
                <Text style={styles.projectDescription}>
                    {value}
                </Text>
            </TouchableOpacity>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                     overlayStyle={{width: '96%',
                     paddingHorizontal:0,
                     paddingVertical: 0}}>
                <FormikPatchDescriptionForm label={'Project Description'}
                                            setValue={setValue}
                                            setVisible={setVisible}
                                     currentValue={value}
                                     id={props.id}/>
            </Overlay>
        </>
    )
}
export default ProjectReviewDescription