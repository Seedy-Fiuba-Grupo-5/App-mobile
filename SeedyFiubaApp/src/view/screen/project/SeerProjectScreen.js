import React, {useCallback, useEffect, useState} from "react";
import UseAuth from "../../component/UseAuth";
import ApiUser from "../../../model/ApiUser";
import Loading from "../../component/Loading";
import {RefreshControl, ScrollView, Text} from "react-native";
import SeedyFiubaEmpty from "../../component/SeedyFiubaEmpty";
import SeerInvitation from "../../component/SeerInvitation";
import SeerProject from "../../component/SeerProject";

const SeerProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();
    const projectDetail = (project)=>{
        navigation.navigate("Project",
            {
                project: project,
                editable: false
            })}
    const getProjects = (action) => {
        action(true);
        ApiUser.seer(id)
            .then((data) => {
                action(false);
                setProjects(data.projects);
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
                                ):(projects.map((project,index) => {
                                    if (project[1]){
                                        return (
                                            <SeerProject key={index} projectId={project[0]} onPress={projectDetail}/>
                                            )
                                    }else {
                                        return <SeerInvitation key={index} projectId={project[0]}/>
                                    }
                                    }))

                            }
                            <Text/>
                        </ScrollView>
                    )
            }
        </>
    )
}
export default SeerProjectScreen