import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {ScrollView, Text, View} from "react-native";
import ApiProject from "../model/ApiProject";
import {SpeedDial} from "react-native-elements";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-android";

const ProjectsView = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        ApiProject.projects()
            .then((data) => {setProjects(data.allProjects)})
            .catch((error) => {});
    },[]);
    return (
        <View>
            <ScrollView>
                {
                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.push("Project", {project: project, editable: false})
                                             }/>)
                    })
                }
            </ScrollView>
            <View
                style={{
                    height: '9%',
                    width: '100%',
                    position: 'absolute',
                    top: '0%',
                    backgroundColor: 'white',
                    right: 0.2,
                    elevation: 2,
                }}>
                <SearchBar
                    placeholder="Type Here..."
                    value={'search'}/>
            </View>
        </View>
    )

}
export default ProjectsView