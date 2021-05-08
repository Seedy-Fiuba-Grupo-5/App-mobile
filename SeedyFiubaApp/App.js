import React from 'react';
import 'react-native-gesture-handler';
import ProjectView from './src/view/ProjectView';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const App = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={ProjectView} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default App;


