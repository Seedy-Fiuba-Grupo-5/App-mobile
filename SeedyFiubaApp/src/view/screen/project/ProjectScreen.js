import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ProjectView from "./ProjectView";
import ProjectDetailView from "./ProjectDetailView";

const stackProject = createStackNavigator();
const ProjectScreen = () => {
    return (
        <stackProject.Navigator initialRouteName="MainProject">
            <stackProject.Screen
                name="MainProject"
                component={ProjectView}
                options={{headerShown:false}}/>
            <stackProject.Screen name="Project" component={ProjectDetailView} options={({route}) => {
                return ({
                    title: route.params.project.name
                })
            }}/>
        </stackProject.Navigator>
        );
}
export default ProjectScreen