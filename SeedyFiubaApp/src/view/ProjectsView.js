import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {ScrollView} from "react-native";
import ApiProject from "../model/ApiProject";

const ProjectsView = ({navigation}) => {
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
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.push("Project", {project: project})
                                             }/>)
                    })
                }
            </ScrollView>
    )

}
export default ProjectsView