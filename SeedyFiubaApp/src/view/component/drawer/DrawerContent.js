import React, {useContext} from 'react';
import {View} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Divider, Icon} from "react-native-elements";
import drawerStyles from "../../Styles/DrawerStyleSheet";
import UseAuth from "../UseAuth";

const DrawerContent = (props) => {
    const {signOut, signOutGoogle} = UseAuth();
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='list'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Main'}
                    onPress={() => {
                        props.navigation.navigate('Main')
                    }}
                    labelStyle={drawerStyles.drawerText}/>

                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='person-outline'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Account'}
                    onPress={() => {
                        props.navigation.navigate('Account')
                    }}
                    labelStyle={drawerStyles.drawerText}/>

                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='note-text-outline'
                              type='material-community'
                              size={size}
                              color={color}/>)
                    }
                    label={'My Projects'}
                    onPress={() => {
                        props.navigation.navigate('AccountProjects')
                    }}
                    labelStyle={drawerStyles.drawerText}/>

                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='post-add'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Create Project'}
                    onPress={() => {
                        props.navigation.navigate('NewProject')
                    }}
                    labelStyle={drawerStyles.drawerText}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='favorite-outline'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Favorite Projects'}
                    onPress={() => {
                        props.navigation.navigate('FavoriteProjects')
                    }}
                    labelStyle={drawerStyles.drawerText}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='bell-outline'
                              type='material-community'
                              size={size}
                              color={color}/>)
                    }
                    label={'Notifications'}
                    onPress={() => {
                        console.log('Notifications');
                    }}
                    labelStyle={drawerStyles.drawerText}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='eye-outline'
                              type='material-community'
                              size={size}
                              color={color}/>)
                    }
                    label={'Seer'}
                    onPress={() => {
                        props.navigation.navigate('SeerProjects')
                    }}
                    labelStyle={drawerStyles.drawerText}/>
            </DrawerContentScrollView>
            <DrawerItem
                icon={({color, size}) =>
                    (
                        <Icon
                            name='logout'
                            type='material'
                            size={size}
                            color={color}/>)
                }
                label={'Sign Out'}
                onPress={() => {
                    signOut();
                }}
                labelStyle={drawerStyles.drawerText}/>
        </View>
    )
}
export default DrawerContent;