import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/view/screen/HomeScreen";
import ProjectReviewScreen from "./src/view/screen/ProjectReviewScreen";
import {useFonts, Capriola_400Regular} from '@expo-google-fonts/capriola';
import {Text} from "react-native";
import LoginScreen from "./src/view/screen/LoginScreen";


const homeStack = createStackNavigator();

const App = () => {
    let [fontsLoaded] = useFonts({
        Capriola_400Regular,
    });
    if (!fontsLoaded) {
        return (<Text>
            Loading
        </Text>);
    } else {
        return (
            /*<NavigationContainer>
                <homeStack.Navigator initialRouteName="Home" screenOptions={
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
                    <homeStack.Screen name="Home" component={HomeScreen}
                                      options={{
                                          title: 'SeedyFiuba'
                                      }}/>
                    <homeStack.Screen name="Project" component={ProjectReviewScreen}
                                      options={({route}) => {
                                          return ({
                                              title: route.params.project.name
                                          })
                                      }}/>
                </homeStack.Navigator>
            </NavigationContainer>*/
            <LoginScreen/>
        )

    }
}
export default App;


