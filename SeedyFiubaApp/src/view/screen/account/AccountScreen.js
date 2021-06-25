import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Header, Icon} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import AccountInformationCard from "../../component/AccountInformationCard";
import AccountAvatar from "../../component/AccountAvatar";
import AuthButton from "../../component/AuthButton";
import authStyle from "../../Styles/AuthStyleSheet";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import User from "../../../model/User";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";

const AccountScreen = ({navigation}) => {
    const {jwt} = UseAuth();
    const [user,setUser] = useState(new User());
    useEffect(() => {
        return navigation.addListener('focus', () => {
            console.log('Hola');
            ApiUser.user(jwt)
                .then((data)=>{
                    setUser(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    },[navigation]);
    return (
        <View style={{flex: 1, alignContent: 'center'}}>
            <CustomPrincipalHeader navigation={navigation} title={"Account"}/>
            <View style={{flex: 2, alignItems: 'center'}}>
                <AccountAvatar name={{firstName:user.firstName,lastName:user.lastName}}/>
            </View>
            <View style={{flex: 3,margin:20}}>
                <AccountInformationCard firstName={user.firstName}
                                        lastName={user.lastName}
                                        email={user.email}/>
            </View>
            <AuthButton title={'Edit Information'}
                        style={authStyle.secondButton}
                        onPress={()=>{navigation.navigate('EditAccount',{users:user})}}/>
        </View>
    )
}
export default AccountScreen