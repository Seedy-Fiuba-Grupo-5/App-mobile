import React,{useEffect, useState} from "react";
import ApiProject from "../../../model/ApiProject";
import {ScrollView, Text, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-android";
import {Header, Icon} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import SeedyFiubaHeader from "../../component/SeedyFiubaHeader";

const ProjectView = ({navigation}) => {
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
            <SeedyFiubaHeader navigation={navigation}/>
            <ScrollView>
                {
                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.push("Project", {
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
export default ProjectView