import React from "react";
import {Image, Text, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ProjectCardFinancialInfo from "../component/ProjectCardFinancialInfo";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

import ProjectReviewImage from "../component/ProjectRevieImage";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <ProjectReviewImage/>
            <View
                style={{
                    width:'92%',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <Text style={styles.titleText}>
                    {route.params.project.name}
                </Text>
                <Text style={styles.projectDescription}>
                    {route.params.project.description}
                </Text>
                <LinearProgress value={0.5}
                                color={'#009688'}
                                variant={"determinate"}/>
                <ProjectCardFinancialInfo project={route.params.project}/>
            </View>
        </>
    )
}
export default ProjectReviewScreen;