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
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const {id} = UseAuth();
    const projectDetail = (project)=>{
        navigation.navigate("Project",
            {
                project: project,
                editable: false,
                seer:true
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
        return navigation.addListener('focus', () => {
            getProjects(setIsLoading);
        });
    }, [navigation]);

    const onRefresh = useCallback(() => {
        getProjects(setRefreshing);
    }, []);

    return (
        <>
            {
                isLoading &&
                <Loading customStyle={{paddingTop:0,top:70,elevation:1 ,position:'absolute',backgroundColor:'white',width:'100%',height:'88%'}}/>
            }
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
                                return <SeerInvitation
                                    key={index}
                                    projectId={project[0]}
                                    onSuccess={()=>getProjects(setIsLoading)}/>
                            }
                        }))

                }
                <Text/>
            </ScrollView>
        </>
    )
}
export default SeerProjectScreen