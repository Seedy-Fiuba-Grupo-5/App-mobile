import moment from "moment";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Card, Icon} from "react-native-elements";
import ProjectCardStyleSheet from "../Styles/ProjectCardStyleSheet";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import React, {useEffect, useState} from "react";
import ApiProject from "../../model/ApiProject";
import Project from "../../model/Project";
import UseAuth from "./UseAuth";
import LoadingText from "./LoadingText";

const SeerProject = ({projectId,onPress}) => {
    const [project, setProject] = useState(new Project());
    const [isLoading, setIsLoading] = useState(true);
    const {id, jwt} = UseAuth();
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

    const collected = (amount, goal) => {
        if (!amount || !goal) {
            return 0;
        }
        return amount / goal;
    }
    const daysToEnd = (date) => {
        const today = moment().format('DD/MM/YYYY');
        let start = moment(today, "DD/MM/YYYY");
        let end = moment(date, "DD/MM/YYYY");
        return end.diff(start, 'days');
    }
    const defaultImage = (image) => {
        const images = ['not_found', 'nothing', undefined, null, ""];
        return images.includes(image);
    }

    if(isLoading){
        return (
            <Card containerStyle={ProjectCardStyleSheet.projectCard}>
                <LoadingText/>
            </Card>
        )

    } else {
        const amountCollected = collected(0, project.goal);
        const amountDays = daysToEnd(project.endDate);
        return (
            <TouchableOpacity onPress={()=>{onPress(project)}}>
                <Card containerStyle={ProjectCardStyleSheet.projectCard}>
                    {defaultImage(project.image) ?
                        (<Image
                            source={require('../images/default.jpg')}
                            style={{width:300, height:150,  alignSelf: "center"}}
                        />) :
                        (<Image
                            source={{uri: project.image}}
                            style={{width:300, height:150, alignSelf: "center"}}/>)}
                    <Card.Title
                        style={ProjectCardStyleSheet.title}>
                        {project.name}
                    </Card.Title>
                    <Card.FeaturedSubtitle numberOfLines={1} style={ProjectCardStyleSheet.description}>
                        {project.description}
                    </Card.FeaturedSubtitle>
                    <Card.Divider color={'white'}/>
                    <LinearProgress
                        style={{height: 6}}
                        value={amountCollected}
                        color={'#4b1e4d'}
                        variant={"determinate"}/>
                    <Card.Divider color={'white'}/>
                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <Text style={ProjectCardStyleSheet.principalText}>
                            {amountCollected * 100}% <Text style={ProjectCardStyleSheet.secondText}>
                            Collected</Text>
                        </Text>
                        <Text style={ProjectCardStyleSheet.principalText}>
                            {amountDays} <Text style={ProjectCardStyleSheet.secondText}>
                            Days to end</Text>
                        </Text>
                    </View>
                    <Card.Divider color={'white'}/>

                    <View style={{flexDirection: "row", justifyContent: 'center'}}>
                        <Icon name='explore'
                              type='material'
                              size={20}
                              color='#85929d'/>
                        <Text style={ProjectCardStyleSheet.secondText}>
                            {project.type}
                        </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

}
export default SeerProject