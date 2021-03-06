import React, {useCallback, useEffect, useState} from "react";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import User from "../../../model/User";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {Icon} from "react-native-elements";
import AccountWalletInformationCard from "../../component/account/AccountWalletInformationCard";
import AccountCarousel from "../../component/account/AccountCarousel";
import {ActivityIndicator} from "react-native-paper";

const AccountScreen = ({navigation}) => {
    const {id,jwt} = UseAuth();
    const [user,setUser] = useState(new User());
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const updateUser = (newUser) => {
        setUser(newUser);
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setIsLoading(true)
            ApiUser.user(id,jwt)
                .then((data) => {
                    setIsLoading(false);
                    setUser(data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        });
    }, [navigation]);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiUser.user(id,jwt)
            .then((data) => {
                setRefreshing(false);
                setUser(data);
            })
            .catch((error) => {
                setRefreshing(false);
                console.log(error);
            });

    }, []);
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
                isLoading &&
                <View style={
                            {
                                justifyContent: "center",
                                position:'absolute',
                                elevation:1,
                                width:'100%',
                                height:'100%',
                            }
                        }>
                    <ActivityIndicator size="Large" color="#4b1e4d"/>
                </View>
            }
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4b1e4d']}
                    />
                }>
                <AccountCarousel items={1}>
                    <AccountInformationCard
                        id={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}/>
                    <AccountWalletInformationCard
                        address={user.address}
                        balance={user.balance}
                        privateKey={user.privateKey}/>
                </AccountCarousel>
            </ScrollView>
        </View>
    )
}
export default AccountScreen