import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import ProjectReviewScreen from "./ProjectReviewScreen";
import ProjectScreen from "./ProjectScreen";
import NewProjectView from "../NewProjectView";
const homeStack = createStackNavigator();
const HomeScreen = () => {
    return(
        <homeStack.Navigator initialRouteName="Home"
            screenOptions={
                {headerStyle: {backgroundColor: "#4b1e4d"},
                    headerTitleStyle: {color: '#fff'},
                    headerTintColor: 'white',
                }}>
            <homeStack.Screen name="Home" component={ProjectScreen} options={{headerShown:false}}/>
            <homeStack.Screen name="Project" component={ProjectReviewScreen}
                              options={({route}) => {
                                  return ({
                                      title: route.params.project.name
                                  })
                              }}/>
            <homeStack.Screen name="New Project" component={NewProjectView} options={{headerShown:true}}/>
        </homeStack.Navigator>
    )
}
export default HomeScreen;
