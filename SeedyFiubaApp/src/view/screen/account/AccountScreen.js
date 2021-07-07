import React, {useEffect, useState} from "react";
import {View} from "react-native";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import AccountAvatar from "../../component/account/AccountAvatar";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import authStyle from "../../Styles/AuthStyleSheet";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import User from "../../../model/User";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {Icon} from "react-native-elements";

const AccountScreen = ({navigation}) => {
    const {id} = UseAuth();
    const [user,setUser] = useState(new User());
    useEffect(() => {
        return navigation.addListener('focus', () => {
            console.log(id);
            ApiUser.user(id)
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
            <CustomPrincipalHeader
                navigation={navigation}
                title={"Account"}
                iconRight={
                    <Icon
                        name='edit'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={
                            ()=>{navigation.navigate('EditAccount',{users:user})}
                        }/>
                }
            />
            <View style={{flex: 2, alignItems: 'center'}}>
                <AccountAvatar name={{firstName:user.firstName,lastName:user.lastName}}/>
            </View>
            <View style={{flex: 3,margin:20}}>
                <AccountInformationCard firstName={user.firstName}
                                        lastName={user.lastName}
                                        email={user.email}/>
            </View>
        </View>
    )
}
export default AccountScreen