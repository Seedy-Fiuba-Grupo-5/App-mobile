import React, {useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {ScrollView, View} from "react-native";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";

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
    )
}
export default ProjectScreen