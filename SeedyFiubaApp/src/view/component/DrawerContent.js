import React, {useContext} from 'react';
import {View} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Divider, Icon} from "react-native-elements";
import drawerStyles from "../Styles/DrawerStyleSheet";
import UseAuth from "./UseAuth";

const DrawerContent = (props) => {
    const {signOut} = UseAuth();
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <Divider style={drawerStyles.divider}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='list'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Main'}
                    onPress={()=>{props.navigation.navigate('Main')}}
                    labelStyle={drawerStyles.drawerText}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='person-outline'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Account'}
                    onPress={()=>{props.navigation.navigate('Account')}}
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
                onPress={()=>{
                    signOut()}}
                labelStyle={drawerStyles.drawerText}/>
        </View>
    )
}
export default DrawerContent;