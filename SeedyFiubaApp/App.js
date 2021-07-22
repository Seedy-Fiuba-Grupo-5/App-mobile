import React, {useEffect, useRef, useState} from 'react';
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
import {Image, LogBox, Platform, Text, View} from "react-native";
import Firebase from "./src/model/Firebase";
import ProjectDetailHeader from "./src/view/component/project/ProjectDetailHeader";
import CreatorScreen from "./src/view/screen/creator/CreatorScreen";
import CreatorHeader from "./src/view/component/creator/CreatorHeader";
import UserInformation from "./src/model/UserInformation";
import {ActivityIndicator} from "react-native-paper";
import {Icon} from "react-native-elements";
import SearchProjectScreen from "./src/view/screen/project/SeacrhProjectScreen";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import SeerProjectScreen from "./src/view/screen/project/SeerProjectScreen";
import FavoriteProjectScreen from "./src/view/screen/project/FavoriteProjectsScreen";
import NotificationsScreen from "./src/view/screen/account/NotificationsScreen";

const authStack = createStackNavigator();
const accountDrawer = createDrawerNavigator();
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const App = () => {
    LogBox.ignoreLogs([
        'Setting a timer for a long period of time',
        'Non-serializable values were found in the navigation state']);
    Firebase.init();

    const [jwt, setJWT] = useState(null);
    const [id, setId] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(
        ()=>{
            setIsLoading(true);
            UserInformation.getData('user')
                .then((value)=> {
                    setIsLoading(false);
                    if (value) {
                        setJWT(value.jwt);
                        setId(value.id)
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                })
        },[]
    )
    return (
        <AuthContext.Provider value={{jwt,id,setJWT,setId}}>
            {
                isLoading?
                    (<View style={{paddingTop:200}}>
                        <Image source={require('./src/view/images/logo.png')} style={{
                            width: 110,
                            height: 110,
                            alignSelf: "center",
                            margin: 10
                        }}/>
                        <ActivityIndicator size="Large" color="#4b1e4d"/>
                    </View>):
                    (
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
                                                    navigation={scene.descriptor.navigation}
                                                    iconRight={<Icon
                                                        name='search'
                                                        type='material'
                                                        size={30}
                                                        color='#fff'
                                                        onPress={() => {
                                                            scene.descriptor.navigation.navigate("Search");
                                                        }}/>}
                                                />)}
                                        }}
                                    />
                                    <accountDrawer.Screen name ='Search'
                                                          component={SearchProjectScreen}/>
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
                                    <accountDrawer.Screen
                                        name ='SeerProjects'
                                        component={SeerProjectScreen}
                                        options={{
                                            headerShown:true,
                                            header:({scene})=>{
                                                return (<CustomPrincipalHeader
                                                    title={'Seer'}
                                                    navigation={scene.descriptor.navigation}/>)}
                                        }}
                                    />
                                    <accountDrawer.Screen
                                        name ='NotificationsScreen'
                                        component={NotificationsScreen}
                                        options={{
                                            headerShown:true,
                                            header:({scene})=>{
                                                return (<CustomPrincipalHeader
                                                    title={'Notifications Screen'}
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
                                                          component={CreatorScreen}/>
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
                                    <accountDrawer.Screen
                                        name ='FavoriteProjects'
                                        component={FavoriteProjectScreen}
                                        options={{
                                            headerShown:true,
                                            header:({scene})=>{
                                                return (<CustomPrincipalHeader
                                                    title={'Favorite Projects'}
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
                    )
            }
        </AuthContext.Provider>
    )
}
export default App


