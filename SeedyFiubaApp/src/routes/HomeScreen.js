import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StatusBar} from "expo-status-bar";
import ProjectView from "../view/ProjectView";
import UserProjectView from "../view/UserProjectView";

const Tab = createMaterialTopTabNavigator();
const HomeScreen = (navigation) => {


    return(
        <>
            <StatusBar translucent={false}
                       backgroundColor="white"/>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Projects" component={ProjectView} />
                    <Tab.Screen name="My Projects" component={UserProjectView} />
                </Tab.Navigator>
            </NavigationContainer>
        </>

    )
}
export default HomeScreen;
