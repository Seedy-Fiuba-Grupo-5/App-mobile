import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/view/screen/HomeScreen";
import ProjectReviewScreen from "./src/view/screen/ProjectReviewScreen";
import {useFonts, Capriola_400Regular} from '@expo-google-fonts/capriola';
import {Text} from "react-native";
import LoginScreen from "./src/view/screen/LoginScreen";
import AuthScreen from "./src/view/screen/AuthScreen";
import RegisterScreen from "./src/view/screen/RegisterScreen";


//const homeStack = createStackNavigator();
const stack = createStackNavigator();

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
            <NavigationContainer>
                <stack.Navigator screenOptions={{headerShown:false}}>
                    <stack.Screen name='Main' component={AuthScreen} />
                    <stack.Screen name='Login' component={LoginScreen}/>
                    <stack.Screen name='Register' component={RegisterScreen}/>
                </stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default App;


