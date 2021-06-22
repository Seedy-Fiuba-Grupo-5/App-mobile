import {createStackNavigator} from "@react-navigation/stack";
import ProjectView from "./ProjectView";
import ProjectDetailView from "./ProjectDetailView";
import React from "react";
import AccountProjectView from "./AccountProjectView";

const stackAccountProject = createStackNavigator();
const AccountProjectScreen = () => {
    return (
        <stackAccountProject.Navigator initialRouteName="MainAccountProject">
            <stackAccountProject.Screen
                name="MainAccountProject"
                component={AccountProjectView}
                options={{headerShown:false}}/>
            <stackAccountProject.Screen name="AccountProject" component={ProjectDetailView} options={({route}) => {
                return ({
                    title: route.params.project.name
                })
            }}/>
        </stackAccountProject.Navigator>
    );
}
export default AccountProjectScreen