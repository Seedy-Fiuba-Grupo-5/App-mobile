import React from "react";
import {ScrollView, View} from "react-native";
import NewProjectForm from "./component/NewProjectForm";

const NewProjectView = ({navigation}) => {
    return (
        <ScrollView
            keyboardShouldPersistTaps='always'>
            <NewProjectForm
            navigation={navigation}/>
        </ScrollView>
    )
}
export default NewProjectView