import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProjectScreen from "./project/ProjectScreen";
import AccountProjectScreen from "./project/AccountProjectScreen";
const mainBottomTab = createBottomTabNavigator();
const MainScreen = () => {
    return (
        <mainBottomTab.Navigator>
            <mainBottomTab.Screen name="Projects" component={ProjectScreen}/>
            <mainBottomTab.Screen name="My Projects" component={AccountProjectScreen}/>
        </mainBottomTab.Navigator>
    );

}
export default MainScreen