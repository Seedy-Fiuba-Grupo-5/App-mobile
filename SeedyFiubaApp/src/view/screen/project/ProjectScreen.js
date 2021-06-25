import React, {useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import Loading from "../../component/Loading";

const ProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        ApiProject.projects()
            .then((data) => {
                setIsLoading(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
    }, []);
    return (
        <View>
            <CustomPrincipalHeader navigation={navigation} title={"SeedyFiuba"}/>
            <ScrollView>
                {isLoading ?
                    (<Loading/>) :
                    (projects.map((project) => {
                    return (<ProjectCard key={project.id}
                                         project={project}
                                         onPress={() => navigation.navigate("Project", {
                                             project: project,
                                             editable: false})
                                         }/>)}))
                }
            </ScrollView>
        </View>
    )
}
export default ProjectScreen