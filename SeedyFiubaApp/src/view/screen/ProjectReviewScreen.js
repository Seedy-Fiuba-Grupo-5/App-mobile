import React from "react";
import {Text} from "react-native";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <Text>
                {route.params.project.name}
            </Text>
            <Text>
                {route.params.project.id}
            </Text>
        </>

    )
}
export default ProjectReviewScreen;