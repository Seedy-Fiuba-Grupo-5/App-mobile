import React, {useContext, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./src/view/screen/auth/LoginScreen";
import RegisterScreen from "./src/view/screen/auth/RegisterScreen";
import AuthContext from "./src/view/component/AuthContext";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./src/view/component/DrawerContent";
import AccountScreen from "./src/view/screen/account/AccountScreen";
import EditAccountScreen from "./src/view/screen/account/EditAccountScreen";
import ProjectDetailScreen from "./src/view/screen/project/ProjectDetailScreen";
import ProjectScreen from "./src/view/screen/project/ProjectScreen";
import AccountProjectScreen from "./src/view/screen/project/AccountProjectScreen";
import NewProjectScreen from "./src/view/screen/project/NewProjectScreen";
import CustomPrincipalHeader from "./src/view/component/CustomPrincipalHeader";

const authStack = createStackNavigator();
const accountDrawer = createDrawerNavigator();

const App = () => {

    const [jwt, setJWT] = useState(null);
    const [id, setId] = useState(null);
    return (
        <AuthContext.Provider value={{jwt,id,setJWT,setId}}>
            <NavigationContainer>
                {(jwt !== null && id !== null) ? (
                    <accountDrawer.Navigator
                        drawerContent={ props=> <DrawerContent {...props}/>}
                        screenOptions={{swipeEnabled:false}}>
                        <accountDrawer.Screen
                            name ='Main'
                            component={ProjectScreen}
                            options={{
                                headerShown:true,
                                header:({scene})=>{
                                    return (<CustomPrincipalHeader
                                        title={'SeedyFiuba'}
                                        navigation={scene.descriptor.navigation}/>)}
                            }}
                        />
                        <accountDrawer.Screen name ='Account'
                                              component={AccountScreen}/>
                        <accountDrawer.Screen
                            name ='EditAccount'
                            component={EditAccountScreen}
                            />
                        <accountDrawer.Screen
                            name ='AccountProjects'
                            component={AccountProjectScreen}
                            options={{
                                headerShown:true,
                                header:({scene})=>{
                                    return (<CustomPrincipalHeader
                                        title={'My Projects'}
                                        navigation={scene.descriptor.navigation}/>)}
                            }}
                        />
                        <accountDrawer.Screen name ='Project'
                                              component={ProjectDetailScreen}/>
                        <accountDrawer.Screen
                            name ='NewProject'
                            component={NewProjectScreen}
                            options={{
                                headerShown:true,
                                header:({scene})=>{
                                    return (<CustomPrincipalHeader
                                        title={'New Project'}
                                        navigation={scene.descriptor.navigation}/>)}
                        }}/>
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


