import React, {useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import SeedyFiubaHeader from "../../component/SeedyFiubaHeader";

const AccountProjectView = ({navigation}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ApiUser.projects(1)
            .then((data) => {
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
    });

    return (
        <View>
            <SeedyFiubaHeader navigation={navigation}/>
            <ScrollView>
                {

                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.push("AccountProject", {
                                                 project: project,
                                                 editable: true
                                             })
                                             }/>)
                    })

                }
            </ScrollView>
        </View>
    )
}
export default AccountProjectView