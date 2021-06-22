import React, {useEffect, useState} from "react";
import ProjectCard from "./component/ProjectCard";
import {AsyncStorage, ScrollView, Text, View} from "react-native";
import ApiUser from "../model/ApiUser";
import {SpeedDial} from "react-native-elements";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-android";

const MyProjectsView = ({navigation}) => {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId ] = useState('');
    const [open, setOpen] = useState(false)

    useEffect(() => {
        ApiUser.projects(userId)
            .then((data) => {
                setProjects(data.allProjects)
            })
            .catch((error) => {
            });
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