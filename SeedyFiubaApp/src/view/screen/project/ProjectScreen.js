import React, {useCallback, useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {FlatList, RefreshControl, ScrollView, Text} from "react-native";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";
import UseAuth from "../../component/UseAuth";
import * as Notifications from "expo-notifications";

const ProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {responseListener} = UseAuth();

    useEffect(() => {
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate('NotificationsScreen');
        });
        return () => {
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        ApiProject.projects()
            .then((data) => {
                setIsLoading(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiProject.projects()
            .then((data) => {
                setRefreshing(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
                setRefreshing(false);
                console.log(error);
            });
    }, []);
    return (
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
                                projects.map((project) => {
                                    return (
                                        <ProjectCard key={project.id} project={project}
                                                     onPress={() => navigation.navigate("Project", {
                                                         project: project,
                                                         editable: false,
                                                         seer:false
                                                     })
                                                     }/>
                                    )
                                })
                            }
                            <Text/>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default ProjectScreen