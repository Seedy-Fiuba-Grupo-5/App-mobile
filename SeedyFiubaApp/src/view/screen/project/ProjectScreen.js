import React, {useCallback, useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";

const ProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();
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

    const renderItem = ({ item }) => (
        <ProjectCard project={item}
                     onPress={() => navigation.navigate("Project", {
                         project: item,
                         editable: false,
                         user:id
                     })
                     }/>
    );
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
                        <FlatList
                            keyExtractor={item => item.id.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#4b1e4d']}
                                />
                            }
                            data={projects}
                            renderItem={renderItem}/>
                    )

            }
        </>
    )
}
export default ProjectScreen