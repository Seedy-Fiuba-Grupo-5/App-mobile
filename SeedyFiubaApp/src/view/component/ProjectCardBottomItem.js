import React from "react";
import {Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const ProjectCardBottomItem = (props) => {
    return (
        <>
            <Icon
                raised
                name='tag'
                type='font-awesome-5'
                color='grey'/>
            <Text>
                {props.project.type}
            </Text>
        </>
    )
}
export default ProjectCardBottomItem