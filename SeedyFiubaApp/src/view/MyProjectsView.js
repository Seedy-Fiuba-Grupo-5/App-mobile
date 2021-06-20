import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {AsyncStorage, ScrollView, Text, View} from "react-native";
import ApiUser from "../model/ApiUser";
import { Button } from 'react-native-elements';
import {SpeedDial} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

const MyProjectsView = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId ] = useState('');
    const [open, setOpen] = useState(false)

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
        <View>
            <ScrollView>
                {

                    projects.map((project) => {
                        return (<ProjectCard key={project.id} project={project}
                                             onPress={() => navigation.push("Project", {project: project, editable: true})
                                             }/>)
                    })

                }
            </ScrollView>
            <View
                style={{
                    height: 50,
                    width: 50,
                    position: 'absolute',
                    bottom: '5%',
                    right: 0.2,
                    elevation: 2,
                }}>
                <SpeedDial
                    isOpen={open}
                    color={"#4b1e4d"}
                    icon={{ name: 'add', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                        color={"#4b1e4d"}
                        icon={{ name: 'seedling', color: '#fff', type: 'font-awesome-5' }}
                        title="Create Project"
                        titleStyle={{
                            color: 'white',
                            fontWeight: "bold",
                            height:25,
                            width: 120,
                            backgroundColor:"#4b1e4d"
                        }}
                        onPress={() => navigation.push("New Project")}
                    />
                </SpeedDial>
            </View>
        </View>
    )
}
export default MyProjectsView