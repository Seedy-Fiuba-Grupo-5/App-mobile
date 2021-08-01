import ProjectDetailStyleSheet from "../../Styles/ProjectDetailStyleSheet";
import {Text} from "react-native";
import React from "react";

const ProjectDetailKeyValueText = ({projectKey, projectValue}) => {
    return(
        <Text style={ProjectDetailStyleSheet.creator}>
            {projectKey} <Text style={{color: '#4b1e4d'}}> {projectValue}</Text>
        </Text>
    )
}

export default ProjectDetailKeyValueText