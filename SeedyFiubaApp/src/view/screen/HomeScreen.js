import React from 'react';
import 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ProjectsView from "../ProjectsView";
import MyProjectsView from "../MyProjectsView";
import NewProjectView from "../NewProjectView";

const Tab = createMaterialTopTabNavigator();
const HomeScreen = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Projects" component={ProjectsView} />
            <Tab.Screen name="My Projects" component={MyProjectsView} />
            <Tab.Screen name="New Project" component={NewProjectView}/>
        </Tab.Navigator>
    )
}
export default HomeScreen;
