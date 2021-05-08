import ProjectView from "./ProjectView";
import UserProjectView from "./UserProjectView";
import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
const AppView = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Projects" component={ProjectView}/>
            <Tab.Screen name="My Projects" component={UserProjectView}/>
        </Tab.Navigator>
    )
}
export default AppView
