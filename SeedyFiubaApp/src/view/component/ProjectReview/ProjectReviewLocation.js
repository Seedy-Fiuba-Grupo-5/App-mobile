import React from "react";
import {TouchableOpacity, View} from "react-native";
import ProjectCardBottomItem from "../ProjectCardBottomItem";

const ProjectReviewLocation = (props) => {

    return (
        <View style={{
            alignItems: 'center',
            width: '50%',
        }}>

            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                                  alert('This Field Cannot be Modified');
                              }}>
                <ProjectCardBottomItem projectField={props.name}
                                       iconName={'map-marker-alt'}
                                       iconFamily={'font-awesome-5'}/>
            </TouchableOpacity>
        </View>
    )
}
export default ProjectReviewLocation