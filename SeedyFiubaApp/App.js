import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import HomeScreen from "./src/view/screen/HomeScreen";
import ProjectReviewScreen from "./src/view/screen/ProjectReviewScreen";

const homeStack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <homeStack.Navigator initialRouteName="Home">
                <homeStack.Screen name="Home" component={HomeScreen}/>
                <homeStack.Screen name="Project" component={ProjectReviewScreen}
                                  options={({route}) => {
                                      return ({
                                          title: route.params.project.name
                                      })
                                  }}/>
            </homeStack.Navigator>
        </NavigationContainer>
    )
}
export default App;


