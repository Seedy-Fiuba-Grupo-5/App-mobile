import React from "react";
import {ScrollView, View} from "react-native";
import NewProjectForm from "./component/NewProjectForm";

const NewProjectView = () => {
    return (
        <ScrollView
            keyboardShouldPersistTaps='always'>
            <NewProjectForm/>
        </ScrollView>
    )
}
export default NewProjectView