import Loading from "../../component/Loading";
import {RefreshControl, ScrollView, Text} from "react-native";
import ProjectCard from "../../component/project/ProjectCard";
import React, {useCallback, useEffect, useState} from "react";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";

const NotificationsScreen = ({navigation}) => {
    const [notifications, setNotifications ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id, jwt} = UseAuth();
    useEffect(() => {
        ApiUser.getMessages(id, jwt)
            .then((data) => {
                setIsLoading(false);
                setNotifications(data.allMessages);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
        setIsLoading(true);
        setIsLoading(false);
    },[]);
    const onRefresh = useCallback(() => {
        ApiUser.getMessages(id, jwt)
            .then((data) => {
                setIsLoading(false);
                setNotifications(data.allMessages);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
        setRefreshing(true);
        setRefreshing(false);
    }, []);
    return(
        <>
            {
                isLoading ?
                    (<Loading customStyle={{paddingTop:0}}/>) :
                    (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#4b1e4d']}
                                />
                            }>

                            {
                                notifications.map((notification) => {
                                    return (
                                        <Text>{notification.text}</Text>
                                    )
                                })
                            }
                        </ScrollView>
                    )
            }
        </>
    )
}
export default NotificationsScreen