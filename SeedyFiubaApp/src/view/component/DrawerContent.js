import React, {useContext} from 'react';
import {Text, View} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import AuthContext from "../component/AuthContext";
import {Divider, Icon} from "react-native-elements";
import drawerStyles from "../Styles/DrawerStyleSheet";

const DrawerContent = (props) => {
    const {signOut} = useContext(AuthContext);
    const printMessage = () => {
        console.log('message');
    }
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <Icon name='account-circle'
                      type='material'
                      size={80}/>
                <Divider style={drawerStyles.divider}/>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name='person-outline'
                              type='material'
                              size={size}
                              color={color}/>)
                    }
                    label={'Profile'}
                    onPress={printMessage}
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
                onPress={()=>{signOut()}}
                labelStyle={drawerStyles.drawerText}/>
        </View>
    )
}
export default DrawerContent;