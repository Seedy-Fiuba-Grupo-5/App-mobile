import React, {useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";

const AccountProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {jwt} = UseAuth();
    useEffect(() => {
        setIsLoading(true);
        ApiUser.projects(jwt)
            .then((data) => {
                setIsLoading(false);
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
    },[]);

    return (
        <View>
            <CustomPrincipalHeader navigation={navigation} title={"My Projects"}/>
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
        </View>
    )
}
export default AccountProjectScreen