import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import ApiProject from "../../../model/ApiProject";
import {Overlay} from "react-native-elements";
import ProjectCardBottomItem from "../ProjectCardBottomItem";
import FormikPatchTypeForm from "../Formik/FormikPatchTypeForm";

const ProjectReviewType = (props) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        ApiProject.project(props.id).then((data) => {
            setValue(data.type);
        })
    }
    return (
        <View style={{
            alignItems: 'center',
            width: '50%',
        }}>
            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                                toggleOverlay();
            }}>
                <ProjectCardBottomItem projectField={value}
                                       iconName={'lightbulb'}
                                       iconFamily={'font-awesome-5'}/>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                     overlayStyle={{width: '96%',
                         paddingHorizontal:0,
                         paddingVertical: 0}}>
                <FormikPatchTypeForm label={'Project Description'}
                                     setValue={setValue}
                                     setVisible={setVisible}
                                         currentValue={value}
                                         id={props.id}/>
            </Overlay>
        </View>
    )
}
export default ProjectReviewType