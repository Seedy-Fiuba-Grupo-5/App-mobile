import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import ProjectCardBottomItem from "../ProjectCardBottomItem";
import ApiProject from "../../../model/ApiProject";
import {Overlay} from "react-native-elements";
import FormikPatchTypeForm from "../Formik/FormikPatchTypeForm";
import FormikPatchLocationForm from "../Formik/FormikPatchLocationForm";

const ProjectReviewLocation = (props) => {

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(props.name)

    const toggleOverlay = () => {
        setVisible(!visible);
        ApiProject.project(props.id).then((data) => {
            setValue(data.location);
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
                                       iconName={'map-marker-alt'}
                                       iconFamily={'font-awesome-5'}/>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                     overlayStyle={{width: '96%',
                         height: '40%',
                         paddingHorizontal:0,
                         paddingVertical: 0}}>
                <FormikPatchLocationForm label={'Project Description'}
                                         setValue={setValue}
                                         setVisible={setVisible}
                                     currentValue={value}
                                     id={props.id}/>
            </Overlay>
        </View>
    )
}
export default ProjectReviewLocation