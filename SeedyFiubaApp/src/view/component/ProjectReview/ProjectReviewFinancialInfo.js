import React from "react";
import {TouchableOpacity, View} from "react-native";
import ProjectCardFinancialInfo from "../ProjectCardFinancialInfo";

const ProjectReviewFinantialInfo = (props) => {

    return (
        <>

            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                                  alert('This Field Cannot be Modified');
                              }}>
                <ProjectCardFinancialInfo project={props.project}/>
            </TouchableOpacity>
        </>
    )
}
export default ProjectReviewFinantialInfo