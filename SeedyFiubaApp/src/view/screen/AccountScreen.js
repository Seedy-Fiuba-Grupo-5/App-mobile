import React from "react";
import {Text, View} from "react-native";
import {Avatar, Header, Icon} from "react-native-elements";
import accountStyles from "../Styles/AccountStyleSheet";

const AccountScreen = ({navigation}) => {
    return(
        <View style={{flex:1,alignContent:'center'}}>
            <Header
                leftComponent={<Icon
                    name='menu'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {navigation.openDrawer()}}/>}
                centerComponent={<Text style={accountStyles.text}>
                    Account
                </Text>}
                rightComponent={<Icon
                    name='edit'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {console.log('Edit')}}/>}
                containerStyle={accountStyles.header}
            />
            <View style={{flex: 2, alignItems: 'center'}}>
                <Avatar
                    size="xlarge"
                    rounded
                    title="CR"
                    containerStyle={{marginTop:30, backgroundColor:'black'}}
                />
            </View>
            <View style={{flex: 4, alignItems: 'center'}} >
                <View style={{alignItems: 'center',flexDirection:'row'}}>
                    <Text>
                        First Name
                    </Text>
                    <Text> Kevin </Text>
                </View>
                <View style={{alignItems: 'center',flexDirection:'row'}}>
                    <Text>
                        Last Name
                    </Text>
                    <Text> Kevin </Text>
                </View>
            </View>
        </View>
    )
}
export default AccountScreen