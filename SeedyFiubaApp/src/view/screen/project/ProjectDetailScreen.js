import React, {useCallback, useEffect, useRef, useState} from "react";
import {Divider, Header, Icon, Image, Overlay, Rating} from "react-native-elements";
import {ActivityIndicator, Button, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
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
import Payment from "../../../model/Payment";
import SeerSection from "../../component/SeerSection";
import {Video} from "expo-av";
import SupportProject from "../../component/project/SupportProject";

const ProjectDetailScreen = ({navigation,route}) => {
    const [updated, setUpdated] = useState(0);
    const [creator, setCreator] = useState(new Creator());
    const [project, setProject] = useState(new Project());
    const [payment, setPayment] = useState(new Payment());
    const [rating, setRating] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleSeer, setVisibleSeer] = useState(false);
    const [visibleSupport, setVisibleSupport] = useState(false);
    const [visibleRate, setVisibleRate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {id, jwt} = UseAuth();
    const video = useRef(null);
    const [loadVideo, setLoadVideo] = useState(false);
    const showModalEdit = () => setVisibleEdit(true);
    const hideModalEdit = () => setVisibleEdit(false);
    const showModalSeer = () => setVisibleSeer(true);
    const hideModalSeer = () => setVisibleSeer(false);
    const showModalSupport = () => setVisibleSupport(true);
    const hideModalSupport = () => setVisibleSupport(false);
    const showModalRate = () => setVisibleRate(true);
    const hideModalRate = () => setVisibleRate(false);

    const rateProject = () => {
        console.log("Entre");
        ApiProject.rateProject(id, project.id, rating)
            .then((data) => {
                console.log(data);
                getProject(route.params.project.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const addProjectToFavorites = () => {
        ApiUser.addProjectToFavorites(route.params.project.id, id, jwt)
            .then((status) => {
                console.log(status)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeProjectFromFavorites = () => {
        ApiUser.removeProjectFromFavorites(route.params.project.id, id, jwt)
            .then((status) => {
                console.log(status);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const emptyVideo = (video) => {
        const videos = ['not_found', 'nothing', undefined, null, ""];
        return videos.includes(video);
    }
    const defaultImage = (image) => {
        const images = ['not_found', 'nothing', undefined, null, ""];
        return images.includes(image);
    }
    const goal = (stageCost) => {
        let goal = 0;
        stageCost.forEach((value, index, values)=>{ goal = goal + parseFloat(value)});
        return goal.toFixed(4);
    }
    const collected = (amount, goal) => {
        if (!amount || !goal) {
            return 0;
        }
        return amount / goal;
    }
    const getProject = (projectid) => {
        setLoading(true);
        ApiProject.project(projectid)
            .then((data) => {
                setLoading(false);
                setCreator(data.user);
                setPayment(data.payments);
                setProject(data);
                for(let i = 0; i < data.favorites.length; ++i){
                    if(id === data.favorites[i]){
                        setIsFavorite(true);
                        return;
                    }
                }
                setIsFavorite(false);
            })
            .catch((error) => {
                setLoading(false);
                setCreator(new Creator());
                setPayment(new Payment())
                console.log(error);
            });
    }

    useEffect(() => {
        getProject(route.params.project.id);
    }, [updated]);

    useEffect(() => {
        const payload = route.params.project;
        if(payload.id === project.id) return;
        getProject(payload.id);
        setProject(payload);
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiProject.project(route.params.project.id)
            .then((data) => {
                setRefreshing(false);
                setProject(data);
                setCreator(data.user);
                setPayment(data.payments);
                for(let i = 0; i < data.favorites.length; ++i){
                    if(id === data.favorites[i]){
                        setIsFavorite(true);
                    }
                }
            })
            .catch((error) => {
                setRefreshing(false);
                setCreator(new Creator());
                setPayment(new Payment())
                console.log(error);
            });

    }, []);
    const amountGoal = goal(payment.stagesCost);
    const amountCollected = collected(payment.balance, amountGoal);
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
                        numberOfLines={1}
                        style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf:'center',
                        }}>
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
                            }}/>) : null
                }
                containerStyle={accountStyles.header}
            />
            <Overlay isVisible={visibleEdit} onBackdropPress={hideModalEdit} overlayStyle={{height:400,width:300}}>
                <ProjectEdit project={project} setProject={setProject}/>
            </Overlay>
            <Overlay isVisible={visibleSeer} onBackdropPress={hideModalSeer} overlayStyle={{height:200,width:300}}>
                <InviteSeer project={project}/>
            </Overlay>
            <Overlay isVisible={visibleSupport} onBackdropPress={hideModalSupport} overlayStyle={{height:200,width:300}}>
                <SupportProject
                    projectId={project.id}
                    onSuccess={()=>{
                        setLoading(true);
                        setTimeout(() => {
                            setUpdated(value=>value+1);
                        },10000);
                    }}
                    onEnd={()=>{hideModalSupport()}}/>
            </Overlay>
            {
                loading?
                    (<Loading customStyle={{paddingTop:0}}/>):
                    (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#4b1e4d']}
                                />
                            }
                        >
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
                                <Text
                                    style={{fontSize: 34}}>{project.name}
                                    <Icon
                                        containerStyle={{paddingLeft:20}}
                                        name={isFavorite ? 'favorite': 'favorite-border'}
                                        type='material'
                                        size={30}
                                        color='#4b1e4d'
                                        onPress={() => {
                                            if(isFavorite){
                                                removeProjectFromFavorites();
                                                setIsFavorite(false);
                                            } else {
                                                addProjectToFavorites();
                                                setIsFavorite(true);
                                            }
                                        }}/>
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Creator", {creator:creator})}>
                                    <ProjectDetailKeyValueText projectKey={'Created By'} projectValue={creator.firstName+' '+creator.lastName}/>
                                </TouchableOpacity>
                                <Divider width={20} color={'transparent'}/>

                                <LinearProgress
                                    style={{height: 8}}
                                    value={amountCollected}
                                    color={'#4b1e4d'}
                                    variant={"determinate"}/>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ProjectDetailKeyValueText projectKey={'Collected'} projectValue={payment.balance+'$'}/>
                                    <ProjectDetailKeyValueText projectKey={'Goal'} projectValue={amountGoal+'$'}/>
                                </View>
                                <Divider width={20} color={'transparent'}/>
                                <Text key={0} style={{fontSize:22}}>Description</Text>
                                <Text key={1} style={{fontSize: 18, color:'#4f555c', paddingBottom:20}}>{project.description}</Text>
                                {
                                    emptyVideo(project.video)?
                                        (
                                            <></>
                                        ) : (
                                            <View>

                                                <Text key={0} style={{fontSize:22}}>Multimedia</Text>
                                                <View>
                                                    {loadVideo &&
                                                    <ActivityIndicator
                                                        animating
                                                        color={"#4b1e4d"}
                                                        size="large"
                                                        style={{ flex: 1, position:"absolute", top:"45%", left:"45%" }}
                                                    />
                                                    }
                                                    <Video
                                                        ref={video}
                                                        style={{
                                                            alignSelf: 'center',
                                                            width: 320,
                                                            height: 200,
                                                        }}
                                                        source={{
                                                            uri: project.video,
                                                        }}
                                                        resizeMode="contain"
                                                        onLoadStart={() => setLoadVideo(true)}
                                                        onError={()=>console.log('error')}
                                                        onReadyForDisplay={() => setLoadVideo(false)}
                                                        useNativeControls={true}
                                                        onPlaybackStatusUpdate={status => {
                                                            if (status.didJustFinish){
                                                                video.current.playFromPositionAsync(0);
                                                                video.current.pauseAsync();
                                                            }
                                                        }}

                                                    />
                                                </View>
                                                <Divider width={20} color={'transparent'}/>
                                            </View>
                                        )
                                }
                                <Text key={2} style={{fontSize:22}}>Hashtags</Text>
                                <Text key={3} style={{fontSize: 18, color:'#4f555c', paddingBottom:20}}>{project.hashtags}</Text>
                                <Text key={4} style={{fontSize:22}}>Creation Date</Text>
                                <Text key={5} style={{fontSize: 18, color:'#4f555c'}}>{project.createdOn}</Text>
                                <Divider width={20} color={'transparent'}/>
                                <Text style={{fontSize:22}}>Finish Date</Text>
                                <Text style={{fontSize: 18, color:'#4f555c'}}>{project.endDate}</Text>
                                <Divider width={20} color={'transparent'}/>
                                <Text style={{fontSize:22}}>Features</Text>
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
                                <Divider width={20} color={'transparent'}/>
                                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                                    {visibleRate ?
                                        <Rating
                                            type='star'
                                            tintColor='#F2F2F2'
                                            startingValue={rating}
                                            onFinishRating={(rating) => {
                                                setRating(rating);
                                            }}
                                        /> :
                                        <Rating
                                            readonly
                                            startingValue={project.rating}
                                            type='star'
                                            tintColor='#F2F2F2'
                                        />
                                    }
                                    {visibleRate ?
                                        <Icon
                                            name='send'
                                            type='material'
                                            size={30}
                                            color='#4b1e4d'
                                            onPress={() => {
                                                rateProject()
                                                hideModalRate();
                                            }}
                                        /> :
                                        <Icon
                                            name='add'
                                            type='material'
                                            size={30}
                                            color='#4b1e4d'
                                            onPress={showModalRate}
                                        />
                                    }
                                </View>
                                <Divider width={20} color={'transparent'}/>

                                {
                                    route.params.editable?
                                        (
                                            <SeedyFiubaButton
                                                title='Add Seer'
                                                onPress={() => {showModalSeer();}}
                                                style={ProjectDetailStyleSheet.button}/>
                                        ): (
                                            <View>
                                                {
                                                    route.params.seer?
                                                        (
                                                            <>
                                                                <Text style={{fontSize:22}}>State Project</Text>
                                                                <Text style={{fontSize: 18, color:'#4f555c'}}>{payment.state}</Text>
                                                                <Divider width={20} color={'transparent'}/>
                                                                <SeerSection
                                                                    stagesCost={payment.stagesCost}
                                                                    projectId={project.id}
                                                                    stagesStates={payment.stagesStates}
                                                                    onSuccess={()=>{
                                                                        setLoading(true);
                                                                        setTimeout(() => {
                                                                            setUpdated(value=>value+1);
                                                                        },10000);
                                                                    }}
                                                                />
                                                            </>
                                                        ) : (
                                                            <SeedyFiubaButton
                                                                title='Support'
                                                                onPress={() => {showModalSupport()}}
                                                                style={ProjectDetailStyleSheet.button}/>
                                                        )
                                                }
                                            </View>
                                        )
                                }
                            </View>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default ProjectDetailScreen