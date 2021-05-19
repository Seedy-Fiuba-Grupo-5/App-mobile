import React from "react";
import {Text} from "react-native";
import styles from "../Styles/StyleSheet";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <Text style={styles.titleText}>
                {route.params.project.name}
            </Text>
            <Text style={styles.baseText}>
                {route.params.project.id}
            </Text>
        </>

    )
}
export default ProjectReviewScreen;