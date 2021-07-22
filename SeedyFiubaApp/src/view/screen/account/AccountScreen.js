import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import AccountAvatar from "../../component/account/AccountAvatar";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import User from "../../../model/User";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {Icon} from "react-native-elements";
import Loading from "../../component/Loading";
import AccountWalletInformationCard from "../../component/account/AccountWalletInformationCard";
import AccountCarousel from "../../component/account/AccountCarousel";

const AccountScreen = ({navigation}) => {
    const {id,jwt} = UseAuth();
    const [user,setUser] = useState(new User());
    const [isLoading, setIsLoading] = useState(true);
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    useEffect(
        () => {
            ApiUser.user(id,jwt)
                .then((data) => {
                    console.log(data);
                    setIsLoading(false);
                    setUser(data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        },[]);
    return (
        <View>
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
            {
                isLoading ?
                    (
                        <Loading customStyle={{paddingTop: 0}}/>
                    ) : (
                        <AccountCarousel items={1}>
                            <AccountInformationCard
                                firstName={user.firstName}
                                lastName={user.lastName}
                                email={user.email}/>
                            <AccountWalletInformationCard
                                address={user.address}
                                balance={user.balance}
                                privateAddress={user.privateKey}/>
                        </AccountCarousel>
                    )
            }
        </View>
    )
}
export default AccountScreen