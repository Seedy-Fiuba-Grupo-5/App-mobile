import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import AccountAvatar from "../../component/account/AccountAvatar";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import authStyle from "../../Styles/AuthStyleSheet";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import User from "../../../model/User";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {Icon} from "react-native-elements";
import Loading from "../../component/Loading";
import AccountWalletInformationCard from "../../component/account/AccountWalletInformationCard";

const AccountScreen = ({navigation}) => {
    const {id} = UseAuth();
    const [user,setUser] = useState(new User());
    const [isLoading, setIsLoading] = useState(true);
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    useEffect(
        () => {
            ApiUser.user(id)
                .then((data) => {
                    setIsLoading(false);
                    setUser(data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        },[]);
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
                            ()=>{navigation.navigate('EditAccount',{users:user,updateUser:updateUser})}
                        }/>
                }
            />
            {isLoading ?
                (<Loading customStyle={{paddingTop:0}}/>) :
                (
                <>
                    <View style={{alignItems: 'center'}}>
                        <AccountAvatar name={{firstName: user.firstName, lastName: user.lastName}}/>
                    </View>
                    <ScrollView style={{flex: 1, margin: 20}}>
                        <AccountInformationCard
                            firstName={user.firstName}
                            lastName={user.lastName}
                            email={user.email}/>
                        <AccountWalletInformationCard/>
                    </ScrollView>

                </>
                )
            }
        </View>
    )
}
export default AccountScreen