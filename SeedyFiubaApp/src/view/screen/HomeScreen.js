import React from 'react';
import 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ProjectView from "../ProjectView";
import UserProjectView from "../UserProjectView";

const Tab = createMaterialTopTabNavigator();
const HomeScreen = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Projects" component={ProjectView} />
            <Tab.Screen name="My Projects" component={UserProjectView} />
        </Tab.Navigator>
    )
}
export default HomeScreen;
