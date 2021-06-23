import React, {useEffect, useState} from "react";
import ApiUser from "../../../model/ApiUser";
import {ScrollView, View} from "react-native";
import ProjectCard from "../../component/ProjectCard";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import UseAuth from "../../component/UseAuth";

const AccountProjectScreen = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const {jwt} = UseAuth();
    useEffect(() => {
        ApiUser.projects(jwt)
            .then((data) => {
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

                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.navigate("Project", {
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
export default AccountProjectScreen