import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
//import {useFonts, Capriola_400Regular} from '@expo-google-fonts/capriola';
import LoginScreen from "./src/view/screen/LoginScreen";
import RegisterScreen from "./src/view/screen/RegisterScreen";
import AuthContext from "./src/view/component/AuthContext";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./src/view/screen/HomeScreen";
import DrawerContent from "./src/view/component/DrawerContent";


const authStack = createStackNavigator();
const accountDrawer = createDrawerNavigator();

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
    return (
        <AuthContext.Provider value={auth}>
            <NavigationContainer>
                {token !== null ? (
                    <accountDrawer.Navigator drawerContent={ props=> <DrawerContent {...props}/> }>
                        <accountDrawer.Screen name ='Main' component={HomeScreen}/>
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
export default App;


