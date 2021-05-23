import React from "react";
import {Text} from "react-native";
import styles from "../Styles/StyleSheet";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <Text style={styles.titleText}>
                {route.params.project.name}
            </Text>
            <Text style={styles.labelText}>
                Description: {route.params.project.description}
            </Text>
            <Text style={styles.labelText}>
                Goal: AR$ {route.params.project.goal}
            </Text>
            <Text style={styles.labelText}>
                Hashtags: {route.params.project.hashtags}
            </Text>
            <Text style={styles.labelText}>
                End Date: {route.params.project.endDate}
            </Text>
            <Text style={styles.labelText}>
                Location: {route.params.project.location}
            </Text>

        </>

    )
}
export default ProjectReviewScreen;