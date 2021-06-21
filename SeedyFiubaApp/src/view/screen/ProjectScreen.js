import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ProjectsView from "../ProjectsView";
import MyProjectsView from "../MyProjectsView";
import React from "react";
import {Header, Icon} from "react-native-elements";

const Tab = createMaterialTopTabNavigator();
const ProjectScreen = ({navigation}) => {
    return (
        <>
            <Header leftComponent={<Icon
                name='menu'
                type='material'
                size={30}
                color='#fff'
                onPress={() => {
                    navigation.openDrawer();
                }}/>}
                    backgroundColor={"#4b1e4d"}
                    centerComponent={{
                        text: 'SeedyFiuba',
                        style: {
                            color: '#fff',
                            alignContent: 'center'
                        }
                    }}/>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: "#4b1e4d",
                    inactiveTintColor: 'grey',
                    showIcon: true,
                    indicatorStyle: {
                        borderBottomColor: "#4b1e4d",
                        borderBottomWidth: 2.5,
                        borderColor: "#4b1e4d",
                    },
                }}>
                <Tab.Screen name="Projects" component={ProjectsView}/>
                <Tab.Screen name="My Projects" component={MyProjectsView}/>
            </Tab.Navigator>
        </>
    )
}
export default ProjectScreen