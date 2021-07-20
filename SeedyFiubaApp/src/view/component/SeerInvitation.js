import {Card, Icon} from "react-native-elements";
import ProjectCardStyleSheet from "../Styles/ProjectCardStyleSheet";
import React, {useEffect, useState} from "react";
import UseAuth from "./UseAuth";
import ApiUser from "../../model/ApiUser";
import ApiProject from "../../model/ApiProject";
import Project from "../../model/Project";
import LoadingText from "./LoadingText";
import SeedyFiubaButton from "./SeedyFiubaButton";
import ProjectEditStyleSheet from "../Styles/ProjectEditStyleSheet";
import {Text, View} from "react-native";
import Loading from "./Loading";

const SeerInvitation = ({projectId}) => {
    const [project, setProject] = useState(new Project());
    const [isLoading, setIsLoading] = useState(true);
    const [isResponded, setIsResponded] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const {id, jwt} = UseAuth();

    const accept = () => {
        setIsLoadingButton(true);
        ApiUser.acceptSeer(id, jwt, projectId)
            .then((data)=>{
                setIsLoadingButton(false);
                setIsResponded(true);
                console.log(data);
            })
            .catch((error)=>{
                setIsLoadingButton(false);
                console.log(error);
            })
    }
    const deny = () => {
        setIsLoadingButton(true);
        ApiUser.denySeer(id, jwt, projectId)
            .then((data)=>{
                setIsLoadingButton(false);
                setIsResponded(true);
                console.log(data);
            })
            .catch((error)=>{
                setIsLoadingButton(false);
                console.log(error);
            })
    }

    const getProjects = (action) => {
        ApiProject.project(projectId)
            .then((data) => {
                action(false);
                setProject(data);
            })
            .catch((error) => {
                action(false);
                console.log(error);
            });
    }
    useEffect(() => {
        getProjects(setIsLoading);
    },[]);
    return (
            <Card containerStyle={ProjectCardStyleSheet.projectCard}>

                {
                    isLoading?
                        (<LoadingText/>):
                        (
                            <View>
                                <Card.Title
                                    style={ProjectCardStyleSheet.title}>
                                    Invitation to : {project.name}
                                </Card.Title>
                                {
                                    isLoadingButton?
                                        (<LoadingText/>):
                                        (
                                            <View>
                                                {
                                                    isResponded?
                                                        (<Text style={{alignSelf:'center', color:'#4b1e4d', fontSize:20}}>Reload</Text>):
                                                        (
                                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                                <SeedyFiubaButton
                                                                    title='Accept'
                                                                    onPress={()=>{accept()}}
                                                                    style={{
                                                                        margin:2,
                                                                        backgroundColor: '#4b1e4d',
                                                                        borderRadius: 15,
                                                                        width: '70%',
                                                                        alignSelf: 'center'
                                                                    }}
                                                                    titleStyle={ProjectEditStyleSheet.title}/>

                                                                <SeedyFiubaButton
                                                                    title='Deny'
                                                                    onPress={()=>{deny()}}
                                                                    style={{
                                                                        margin:2,
                                                                        backgroundColor: '#86939e',
                                                                        borderRadius: 15,
                                                                        width: '75%',
                                                                        alignSelf: 'center'
                                                                    }}
                                                                    titleStyle={ProjectEditStyleSheet.title}/>

                                                            </View>
                                                        )
                                                }

                                            </View>
                                        )
                                }
                            </View>
                        )
                }


            </Card>
    )
}

export default SeerInvitation