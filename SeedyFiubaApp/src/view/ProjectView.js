import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {Button, ScrollView} from "react-native";
import NewProjectView from "./NewProjectView";
import {URL_LOCAL} from '@env'
const ProjectView = () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get(URL_LOCAL+'/projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                setProjects(data);
            }).catch(error => console.log(error));
    });
    return (
        <>
            <ScrollView>
                {
                    projects.map((project, index) => {
                            return (
                                <ProjectCard projectName={project}/>
                            )
                        }
                    )
                }
            </ScrollView>
            <NewProjectView/>
        </>
    )

}
export default ProjectView