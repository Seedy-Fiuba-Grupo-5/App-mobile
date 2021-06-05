import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/view/screen/HomeScreen";
import ProjectReviewScreen from "./src/view/screen/ProjectReviewScreen";
import {useFonts, Capriola_400Regular} from '@expo-google-fonts/capriola';
import {Text} from "react-native";
import LoginScreen from "./src/view/screen/LoginScreen";
import AuthScreen from "./src/view/screen/AuthScreen";
import RegisterScreen from "./src/view/screen/RegisterScreen";
import AuthContext from "./src/view/component/AuthContext";


const homeStack = createStackNavigator();
const stack = createStackNavigator();

const App = () => {
    const [token,setToken] = useState(null);
    const auth = {
        signIn: (newToken) => {
            setToken(newToken);
        },
        signUp: (newToken) => {
            setToken(newToken);
        },
        signOut:()=>{
            setToken(null);
        }
    }
    let [fontsLoaded] = useFonts({
        Capriola_400Regular,
    });
    if (!fontsLoaded) {
        return (<Text>
            Loading
        </Text>);
    } else {
        return (
            <AuthContext.Provider value={auth}>
                <NavigationContainer>
                    {token != null ? (
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
                    ) : (
                        <stack.Navigator screenOptions={{headerShown: false}}>
                            <stack.Screen name='Login' component={LoginScreen}/>
                            <stack.Screen name='Register' component={RegisterScreen}/>
                        </stack.Navigator>
                    )
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}
export default App;


