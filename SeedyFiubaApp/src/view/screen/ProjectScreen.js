import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ProjectsView from "../ProjectsView";
import MyProjectsView from "../MyProjectsView";
import NewProjectView from "../NewProjectView";
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
                    centerComponent={{
                        text: 'SeedyFiuba',
                        style: {
                            color: '#fff',
                            alignContent: 'center'
                        }
                    }}/>
            <Tab.Navigator>
                <Tab.Screen name="Projects" component={ProjectsView}/>
                <Tab.Screen name="My Projects" component={MyProjectsView}/>
                <Tab.Screen name="New Project" component={NewProjectView}/>
            </Tab.Navigator>
        </>
    )
}
export default ProjectScreen