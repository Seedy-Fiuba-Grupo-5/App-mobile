import React, {useCallback, useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {FlatList, RefreshControl, ScrollView, Text, View} from "react-native";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import SeedyFiubaEmpty from "../../component/SeedyFiubaEmpty";

const FavoriteProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const {id} = UseAuth();


    useEffect(() => {
        return navigation.addListener('focus', () => {
            getProjects(setIsLoading);
        });
    }, [navigation]);

    const getProjects = (action) => {
        action(true);
        ApiUser.favoriteProjects(id)
            .then((data) => {
                action(false);
                setProjects(data.allProjects);
            })
            .catch((error) => {
                action(false);
                console.log(error);
            });
    }
    const onRefresh = useCallback(() => {
        getProjects(setRefreshing);
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
                            {projects.length === 0?
                                <SeedyFiubaEmpty title={'Without Favorite Projects'}/> : null
                            }
                            <Text/>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default FavoriteProjectScreen