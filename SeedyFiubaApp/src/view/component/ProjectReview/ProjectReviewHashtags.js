import React, {useState} from "react";
import {TouchableOpacity} from "react-native";
import ApiProject from "../../../model/ApiProject";
import {Overlay} from "react-native-elements";
import FormikPatchHashtagsForm from "../Formik/FormikPatchHashtagsForm";
import ProjectCardBottomItem from "../ProjectCardBottomItem";

const ProjectReviewHashtags = (props) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        const apiProject = new ApiProject()
        apiProject.getProject(props.id).then((data) => {
            setValue(data.hashtags);
        })
    }
    return (
        <>
            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                                 toggleOverlay();
            }}>
                <ProjectCardBottomItem projectField={value}
                                       iconName={'tag'}
                                       iconFamily={'font-awesome-5'}/>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                     overlayStyle={{width: '96%',
                         paddingHorizontal:0,
                         paddingVertical: 0}}>
                <FormikPatchHashtagsForm label={'Project Description'}
                                            currentValue={value}
                                            id={props.id}/>
            </Overlay>
        </>
    )
}
export default ProjectReviewHashtags