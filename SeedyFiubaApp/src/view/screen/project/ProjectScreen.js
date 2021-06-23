import React, {useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";

const ProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        ApiProject.projects()
            .then((data) => {
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
    }, []);
    return (
        <View>
            <CustomPrincipalHeader navigation={navigation} title={"SeedyFiuba"}/>
            <ScrollView>
                {
                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.navigate("Project", {
                                                 project: project,
                                                 editable: false
                                             })
                                             }/>)
                    })
                }
            </ScrollView>
        </View>
    )
}
export default ProjectScreen