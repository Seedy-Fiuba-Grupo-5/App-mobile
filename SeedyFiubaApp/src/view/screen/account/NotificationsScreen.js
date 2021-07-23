import Loading from "../../component/Loading";
import {Image, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import ProjectCard from "../../component/project/ProjectCard";
import React, {useCallback, useEffect, useState} from "react";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import {Card, Icon, Overlay} from "react-native-elements";
import CreatorMessage from "../../component/creator/CreatorMessage";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";

const NotificationsScreen = ({navigation}) => {
    const [notifications, setNotifications ] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
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
                isLoading ? (<Loading customStyle={{paddingTop:0}}/>) :
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
                                        <Card key={notification.id} containerStyle={ProjectCardStyleSheet.projectCard}>
                                            <Card.Title
                                                style={ProjectCardStyleSheet.title}>
                                                Message from: {notification.id_1}
                                            </Card.Title>
                                            <Card.FeaturedSubtitle numberOfLines={1}
                                                                   style={ProjectCardStyleSheet.description}>
                                                {notification.text}
                                            </Card.FeaturedSubtitle>
                                            <Card.Divider color={'#4b1e4d'}/>
                                            <SeedyFiubaButton
                                                title='Reply'
                                                onPress={showModal}
                                                style={ProjectEditStyleSheet.button}
                                                titleStyle={ProjectEditStyleSheet.title}
                                            />
                                            <Overlay isVisible={visible} onBackdropPress={hideModal} overlayStyle={{height:200,width:300}}>
                                                <CreatorMessage creatorId={notification.id_1}/>
                                            </Overlay>
                                        </Card>
                                    )
                                }
                            )
                        }
                    </ScrollView>
                )
            }
        </>
    )
}

export default NotificationsScreen