import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import ProjectReviewScreen from "./ProjectReviewScreen";
import ProjectScreen from "./ProjectScreen";
const homeStack = createStackNavigator();
const HomeScreen = () => {
    return(
        <homeStack.Navigator initialRouteName="Home">
            <homeStack.Screen name="Home" component={ProjectScreen} options={{headerShown:false}}/>
            <homeStack.Screen name="Project" component={ProjectReviewScreen}
                              options={({route}) => {
                                  return ({
                                      title: route.params.project.name
                                  })
                              }}/>
        </homeStack.Navigator>
    )
}
export default HomeScreen;
