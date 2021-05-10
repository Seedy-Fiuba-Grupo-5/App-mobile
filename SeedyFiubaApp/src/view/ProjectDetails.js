import {Text, View} from "react-native";
import React from "react";

const ProjectDetails = (navigation) => {
    const pressHandler = () => {
        navigation.goBack();
    }

    return (
        <View>
            <Text>ReviewDetails Screen</Text>
        </View>
    );
}

export default ProjectDetails