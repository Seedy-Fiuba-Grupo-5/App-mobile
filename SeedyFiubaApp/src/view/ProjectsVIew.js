import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {Button, ScrollView} from "react-native";
import ApiProject from "../model/ApiProject";

const ProjectsVIew = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const apiProjects = new ApiProject();
        apiProjects.get()
            .then((data) => {setProjects(data.allProjects)})
            .catch((error) => {});
    });
    return (
            <ScrollView>
                {
                    projects.map((project) => {
                        return (<ProjectCard key={project.id} projectName={project.name}
                                             onPress={() => navigation.push("Project", {project: project})
                                             }/>)
                    })
                }
            </ScrollView>
    )

}
export default ProjectsVIew