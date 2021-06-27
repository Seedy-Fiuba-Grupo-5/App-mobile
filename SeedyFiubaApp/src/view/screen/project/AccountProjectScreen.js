import React, {useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";

const AccountProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = UseAuth();
    useEffect(() => {
        setIsLoading(true);
        ApiUser.projects(id)
            .then((data) => {
                setIsLoading(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
    },[]);

    return (
            <ScrollView>
                {

                    isLoading ? (<Loading/>) : (projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.navigate("Project", {
                                                 project: project,
                                                 editable: true
                                             })
                                             }/>)
                    }))

                }

            </ScrollView>
    )
}
export default AccountProjectScreen