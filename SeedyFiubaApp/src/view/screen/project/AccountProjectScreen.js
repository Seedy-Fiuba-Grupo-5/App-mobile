import React, {useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {ScrollView} from "react-native";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";
import ProjectCard from "../../component/project/ProjectCard";

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
                setIsLoading(false);
                console.log(error);
            });
    },[]);

    return (
            <ScrollView>
                {

                    isLoading ?
                        (<Loading/>) :
                        (projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.navigate("Project", {
                                                 project: project,
                                                 editable: true,
                                                 user:id
                                             })
                                             }/>)
                    }))

                }

            </ScrollView>
    )
}
export default AccountProjectScreen