import React from "react";
import {Text, View} from "react-native";
import {Header, Icon} from "react-native-elements";
import accountStyles from "../Styles/AccountStyleSheet";
import AccountInformationCard from "../component/AccountInformationCard";
import AccountAvatar from "../component/AccountAvatar";
import AuthButton from "../component/AuthButton";
import authStyle from "../Styles/AuthStyleSheet";

const AccountScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignContent: 'center'}}>
            <Header
                leftComponent={<Icon
                    name='menu'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        navigation.openDrawer()
                    }}/>}
                centerComponent={<Text style={accountStyles.text}>
                    Account
                </Text>}
                containerStyle={accountStyles.header}
            />
            <View style={{flex: 2, alignItems: 'center'}}>
                <AccountAvatar name={'Kevin Mendoza'}/>
            </View>
            <View style={{flex: 4,margin:20}}>
                <AccountInformationCard firstName={'Kevin'} lastName={'Mendoza'} email={'test2@test2.com'}/>
            </View>
            <AuthButton title={'Edit Information'} style={authStyle.secondButton} onPress={()=>{navigation.navigate('EditAccount')}}/>
        </View>
    )
}
export default AccountScreen