import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {ScrollView} from "react-native";
const ProjectView = () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(respuesta => respuesta.data)
            .then((data) => {
                setProjects(data);
            });
    });
    return (
        <ScrollView>
            {
                projects.map((project, index) => {
                    return (
                        <ProjectCard key={project.id} projectName={project.name}/>
                    )
                }
                )
            }
        </ScrollView>
    )

}
export default ProjectView