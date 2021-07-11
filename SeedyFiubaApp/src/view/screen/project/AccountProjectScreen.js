import React, {useCallback, useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {FlatList, RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";
import {ListItem} from "react-native-elements";

const AccountProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();
    useEffect(() => {
        setIsLoading(true);
        ApiUser.projects(id)
            .then((data) => {
                setIsLoading(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    },[]);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiUser.projects(id)
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
                                                         editable: true,
                                                         user: id
                                                     })
                                                     }/>
                                    )
                                })
                            }
                        </ScrollView>
                    )
            }
        </>
    )
}

export default AccountProjectScreen