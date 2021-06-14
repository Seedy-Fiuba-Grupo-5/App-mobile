import React, {useContext, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
//import {useFonts, Capriola_400Regular} from '@expo-google-fonts/capriola';
import LoginScreen from "./src/view/screen/LoginScreen";
import RegisterScreen from "./src/view/screen/RegisterScreen";
import AuthContext from "./src/view/component/AuthContext";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./src/view/screen/HomeScreen";
import DrawerContent from "./src/view/component/DrawerContent";
import AccountScreen from "./src/view/screen/AccountScreen";
import EditAccountScreen from "./src/view/screen/EditAccountScreen";
import UseAuth from "./src/view/component/UseAuth";

const authStack = createStackNavigator();
const accountDrawer = createDrawerNavigator();

const App = () => {
    const [jwt, setJWT] = useState(null);
    return (
        <AuthContext.Provider value={{jwt,setJWT}}>
            <NavigationContainer>
                {jwt !== null ? (
                    <accountDrawer.Navigator drawerContent={ props=> <DrawerContent {...props}/> }>
                        <accountDrawer.Screen name ='Main' component={HomeScreen}/>
                        <accountDrawer.Screen name ='Account'
                                              component={AccountScreen}/>
                        <accountDrawer.Screen name ='EditAccount'
                                              component={EditAccountScreen}/>
                    </accountDrawer.Navigator>
                ) : (
                    <authStack.Navigator screenOptions={{headerShown: false}}>
                        <authStack.Screen name='Login' component={LoginScreen}/>
                        <authStack.Screen name='Register' component={RegisterScreen}/>
                    </authStack.Navigator>
                )
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
export default App


