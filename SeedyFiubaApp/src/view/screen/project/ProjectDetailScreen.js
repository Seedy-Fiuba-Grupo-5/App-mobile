import React, {useEffect, useState} from "react";
import {Divider, Header, Icon, Image, Overlay} from "react-native-elements";
import {Button, ScrollView, Text, TouchableOpacity, View} from "react-native";
import ProjectDetailStyleSheet from "../../Styles/ProjectDetailStyleSheet";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import ProjectDetailKeyValueText from "../../component/project/ProjectDetailKeyValueText";
import Creator from "../../../model/Creator";
import accountStyles from "../../Styles/AccountStyleSheet";
import ProjectEdit from "../../component/project/ProjectEdit";
import ApiProject from "../../../model/ApiProject";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";
import Project from "../../../model/Project";
import InviteSeer from "../../component/account/InviteSeer";
import ApiUser from "../../../model/ApiUser";

const ProjectDetailScreen = ({navigation,route}) => {
    const [creator, setCreator] = useState(new Creator());
    const [project, setProject] = useState(new Project());
    const [loading, setLoading] = useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [visibleSeer, setVisibleSeer] = React.useState(false);
    const {id, jwt} = UseAuth();
    const showModalEdit = () => setVisibleEdit(true);
    const hideModalEdit = () => setVisibleEdit(false);
    const showModalSeer = () => setVisibleSeer(true);
    const hideModalSeer = () => setVisibleSeer(false);

    const addProjectToFavorites = () => {
        ApiUser.addProjectToFavorites(project.id, id, jwt)
            .then((status) => {
                console.log(status)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const defaultImage = (image) => {
        const images = ['not_found', 'nothing', undefined, null, ""];
        return images.includes(image);
    }
    const collected = (amount, goal) => {
        if (!amount || !goal) {
            return 0;
        }
        return amount / goal;
    }
    const getProject = (id) => {
        setLoading(true);
        ApiProject.project(id)
            .then((data) => {
                setLoading(false);
                setCreator(data.user);
            })
            .catch((error) => {
                setLoading(false);
                setCreator(new Creator());
                console.log(error);
            });
    }

    useEffect(() => {
        getProject(route.params.project.id);
    }, []);

    useEffect(() => {
        const payload = route.params.project;
        if(payload.id === project.id) return;
        setProject(payload);
        getProject(payload.id);
    })

    const amountCollected = collected(0, project.goal);
    return (
        <>
            <Header
                leftComponent={
                    <Icon
                        name='arrow-back'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={() => {
                            navigation.goBack();
                        }}/>}
                centerComponent={
                    <Text
                        style={accountStyles.text}>
                        {project.name}
                    </Text>}
                rightComponent={
                    route.params.editable?
                        (<Icon
                            name='edit'
                            type='material'
                            size={30}
                            color='#fff'
                            onPress={() => {
                                showModalEdit();
                            }}/>):
                        (<Icon
                            name='favorite-border'
                            type='material'
                            size={30}
                            color='#fff'
                            onPress={() => {
                                addProjectToFavorites();
                            }}/>)
                }
                containerStyle={accountStyles.header}
            />
            <Overlay isVisible={visibleEdit} onBackdropPress={hideModalEdit} overlayStyle={{height:400,width:300}}>
                <ProjectEdit project={project} setProject={setProject}/>
            </Overlay>
            <Overlay isVisible={visibleSeer} onBackdropPress={hideModalSeer} overlayStyle={{height:200,width:300}}>
                <InviteSeer project={project}/>
            </Overlay>
            {
                loading?
                    (<Loading customStyle={{paddingTop:0}}/>):
                    (
                        <ScrollView>
                            <View style={{marginHorizontal: 20}}>
                                <Divider width={6} color={'transparent'}/>
                                {
                                    defaultImage(project.image) ?
                                        (<Image
                                            source={require('../../images/default.jpg')}
                                            style={ProjectDetailStyleSheet.ImageStyle}
                                            containerStyle={ProjectDetailStyleSheet.ImageContainerStyle}/>) :
                                        (<Image
                                            source={{uri: project.image}}
                                            style={ProjectDetailStyleSheet.ImageStyle}
                                            containerStyle={ProjectDetailStyleSheet.ImageContainerStyle}/>)
                                }
                                <Text style={{fontSize: 34}}>{project.name}</Text>
                                {
                                    <TouchableOpacity onPress={() => navigation.navigate("Creator", {creator:creator})}>
                                        <ProjectDetailKeyValueText projectKey={'Created By'} projectValue={creator.firstName+' '+creator.lastName}/>
                                    </TouchableOpacity>
                                }
                                <Divider width={20} color={'transparent'}/>

                                <LinearProgress
                                    style={{height: 8}}
                                    value={amountCollected}
                                    color={'#4b1e4d'}
                                    variant={"determinate"}/>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ProjectDetailKeyValueText projectKey={'Collected'} projectValue={'0$'}/>
                                    <ProjectDetailKeyValueText projectKey={'Goal'} projectValue={project.goal+'$'}/>
                                </View>
                                <Divider width={20} color={'transparent'}/>
                                <Text style={{fontSize:22}}>Description</Text>
                                <Text style={{fontSize: 18, color:'#4f555c', paddingBottom:20}}>{project.description}</Text>
                                <Text style={{fontSize:22}}>Hashtags</Text>
                                <Text style={{fontSize: 18, color:'#4f555c'}}>{project.hashtags}</Text>
                                <Divider width={20} color={'transparent'}/>
                                <Text style={{fontSize:22}}>Finish Date</Text>
                                <Text style={{fontSize: 18, color:'#4f555c'}}>{project.endDate}</Text>
                                <Divider width={20} color={'transparent'}/>
                                <Text style={{fontSize:22}}>Features</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='explore'
                                              type='material'
                                              size={20}
                                              color='#4f555c'/>
                                        <Text style={ProjectCardStyleSheet.secondText}>
                                            {project.type}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='room'
                                              type='material'
                                              size={20}
                                              color='#4f555c'/>
                                        <Text style={ProjectCardStyleSheet.secondText}>
                                            {project.location}
                                        </Text>
                                    </View>
                                </View>
                                <Divider width={20} color={'transparent'}/>
                                {
                                    route.params.editable?
                                        (<SeedyFiubaButton title='Add Seer' onPress={() => {
                                            showModalSeer();
                                        }} style={ProjectDetailStyleSheet.button}/>):
                                        (<SeedyFiubaButton title='Support' onPress={() => {
                                            console.log('Support')
                                        }} style={ProjectDetailStyleSheet.button}/>)


                                }

                            </View>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default ProjectDetailScreen