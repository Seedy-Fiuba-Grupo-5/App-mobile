import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {Button, ScrollView} from "react-native";
import {URL_LOCAL} from '@env'

const ProjectView = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get(URL_LOCAL + '/projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                setProjects(data);
            }).catch(error => console.log(error));
    });
    return (
        <>
            <ScrollView>
                {
                    projects.map((project) => {
                        return (<ProjectCard key={project.id} projectName={project.name}
                                             onPress={() => navigation.push("Project", {project: project})
                                             }/>)
                    })
                }
            </ScrollView>
        </>
    )

}
export default ProjectView