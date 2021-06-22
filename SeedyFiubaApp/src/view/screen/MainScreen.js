import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const mainBottomTab = createBottomTabNavigator();
const MainScreen = () => {
    return (
        <mainBottomTab.Navigator>
            <mainBottomTab.Screen name="Home" component={HomeScreen} />
            <mainBottomTab.Screen name="Settings" component={SettingsScreen} />
        </mainBottomTab.Navigator>
    );

}
export default MainScreen