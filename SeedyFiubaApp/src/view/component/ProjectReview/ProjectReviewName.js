import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import ApiProject from "../../../model/ApiProject";
import styles from "../../Styles/StyleSheet";
import {Overlay} from "react-native-elements";
import FormikPatchNameForm from "../Formik/FormikPatchNameForm";

const ProjectReviewName = (props) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        const apiProject = new ApiProject()
        apiProject.getProject(props.id).then((data) => {
            setValue(data.name);
        })
    }
    return (
        <>
            <TouchableOpacity disabled={!props.editable}
                    onPress={() => {
                toggleOverlay();
            }}>
                <Text style={styles.titleText}>{value}</Text>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                     overlayStyle={{width: '96%',
                         paddingHorizontal:0,
                         paddingVertical: 0}}>
                <FormikPatchNameForm label={'Project Name'}
                                     currentValue={value}
                                     id={props.id}/>
            </Overlay>
        </>
    )
}
export default ProjectReviewName