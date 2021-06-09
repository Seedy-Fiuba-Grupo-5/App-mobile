import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {AsyncStorage, ScrollView} from "react-native";
import ApiUser from "../model/ApiUser";

const MyProjectsView = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId ] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('userId', (err, result) => {
            setUserId(result.toString());
        });
        const apiUser = new ApiUser();
        apiUser.getMyProjects(userId)
            .then((data) => {setProjects(data.allProjects)})
            .catch((error) => {});
    });

    return(
        <ScrollView>
            {
                projects.map((project) => {
                    return (<ProjectCard key={project.id} project={project}
                                         editable={true} navigation={navigation}
                                         onPress={() => navigation.push("EditProject", {project: project})
                                         }/>)
                })
            }
        </ScrollView>
    )
}
export default MyProjectsView