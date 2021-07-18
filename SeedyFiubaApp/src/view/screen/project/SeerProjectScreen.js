import React, {useCallback, useEffect, useState} from "react";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import Loading from "../../component/Loading";
import {RefreshControl, ScrollView, Text} from "react-native";
import ApiProject from "../../../model/ApiProject";
import ProjectCard from "../../component/project/ProjectCard";
import SeedyFiubaEmpty from "../../component/SeedyFiubaEmpty";

const SeerProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();
    const getProjects = (action) => {
        action(true);
        ApiUser.seer(id)
            .then((data) => {
                let allProjects = [];
                console.log(data);
                data.projects.forEach((value,index, values ) => {
                    if (value[1]) {
                        ApiProject.project(value[0])
                            .then((data)=>{
                                allProjects.push(data);
                            })
                            .catch((error)=>
                            {
                                console.log(error)});
                    }
                })
                action(false);
                setProjects(allProjects);
            })
            .catch((error) => {
                action(false);
                console.log(error);
            });
    }
    useEffect(() => {
        getProjects(setIsLoading);
    },[]);
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
                                projects.length === 0?
                                (
                                    <SeedyFiubaEmpty title={'Without Projects'}/>
                                ):(projects.map((project) => {
                                        return (
                                            <ProjectCard key={project.id} project={project}
                                                         onPress={() => navigation.navigate("Project", {
                                                             project: project,
                                                             editable: false,
                                                             user: id
                                                         })
                                                         }/>
                                        )
                                    }))

                            }
                        </ScrollView>
                    )
            }
        </>
    )
}
export default SeerProjectScreen