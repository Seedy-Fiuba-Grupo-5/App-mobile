import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import ProjectReviewScreen from "./ProjectReviewScreen";
import ProjectScreen from "./ProjectScreen";
import {Button} from "react-native-elements";
const homeStack = createStackNavigator();
const HomeScreen = () => {
    return(
        <homeStack.Navigator initialRouteName="Home2" screenOptions={
            {
                headerStyle: {
                    backgroundColor: '#303F9F'
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff',
                    fontFamily: 'Capriola_400Regular'
                }
            }
        }>
            <homeStack.Screen name="Home2" component={ProjectScreen} options={{headerShown:false}}/>
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
