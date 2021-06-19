import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import ApiProject from "../../model/ApiProject";
import styles from "../Styles/StyleSheet";
import {Overlay} from "react-native-elements";
import FormikPatchDescriptionForm from "./Formik/FormikPatchDescriptionForm";

const ProjectReviewDescription = (props) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        const apiProject = new ApiProject()
        apiProject.getProject(props.id).then((data) => {
            setValue(data.description);
        })
    }
    return (
        <>
            <TouchableOpacity onPress={() => {
                toggleOverlay();
            }}>
                <Text style={styles.projectDescription}>
                    {value}
                </Text>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <FormikPatchDescriptionForm label={'Project Description'}
                                     currentValue={value}
                                     id={props.id}/>
            </Overlay>
        </>
    )
}
export default ProjectReviewDescription