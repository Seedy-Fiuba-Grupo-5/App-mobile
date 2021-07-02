import ProjectReview from "../../component/ProjectReview/ProjectReview";
import React from "react";
import {View} from "react-native";
import CustomHeader from "../../component/CustomHeader";

const ProjectDetailScreen = ({navigation,route}) => {
    return (
        <View>
            <CustomHeader navigation={navigation} title={route.params.project.name}/>
            <ProjectReview project={route.params.project}
                           editable={route.params.editable}/>
        </View>
    )

}
export default ProjectDetailScreen