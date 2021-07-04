import React, {useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {ScrollView, View} from "react-native";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";
import UseAuth from "../../component/UseAuth";

const ProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = UseAuth();
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
                                             editable: false,
                                             user:id})
                                         }/>)}))
                }
            </ScrollView>
    )
}
export default ProjectScreen