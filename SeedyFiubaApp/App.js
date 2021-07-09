import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./src/view/screen/auth/LoginScreen";
import RegisterScreen from "./src/view/screen/auth/RegisterScreen";
import AuthContext from "./src/view/component/auth/AuthContext";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./src/view/component/drawer/DrawerContent";
import AccountScreen from "./src/view/screen/account/AccountScreen";
import AccountEditScreen from "./src/view/screen/account/AccountEditScreen";
import ProjectDetailScreen from "./src/view/screen/project/ProjectDetailScreen";
import ProjectScreen from "./src/view/screen/project/ProjectScreen";
import AccountProjectScreen from "./src/view/screen/project/AccountProjectScreen";
import NewProjectScreen from "./src/view/screen/project/NewProjectScreen";
import CustomPrincipalHeader from "./src/view/component/CustomPrincipalHeader";
import {LogBox} from "react-native";
import Firebase from "./src/model/Firebase";
import ProjectDetailHeader from "./src/view/component/project/ProjectDetailHeader";
import CreatorScreen from "./src/view/screen/creator/CreatorScreen";
import CreatorHeader from "./src/view/component/creator/CreatorHeader";

const authStack = createStackNavigator();
const accountDrawer = createDrawerNavigator();

const App = () => {
    LogBox.ignoreLogs([
        'Setting a timer for a long period of time',
        'Non-serializable values were found in the navigation state']);
    Firebase.init();
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
                            component={AccountEditScreen}
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
                                              component={ProjectDetailScreen}
                                              options={{
                                                  headerShown:false,
                                                  header:({scene})=>{
                                                      return (<ProjectDetailHeader
                                                          params={scene.route.params}
                                                          navigation={scene.descriptor.navigation}/>)}
                                              }}/>
                        <accountDrawer.Screen name ='Creator'
                                              component={CreatorScreen}
                                              options={{
                                                  headerShown:true,
                                                  header:({scene})=>{
                                                      return (<CreatorHeader
                                                          title={'Creator'}
                                                          navigation={scene.descriptor.navigation}/>)}
                                              }}/>
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


