import React from "react";
import {Divider, Icon, Image} from "react-native-elements";
import {ScrollView, Text, View} from "react-native";
import ProjectDetailStyleSheet from "../../Styles/ProjectDetailStyleSheet";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import ProjectDetailKeyValueText from "../../component/project/ProjectDetailKeyValueText";

const ProjectDetailScreen = ({route}) => {
    const defaultImage = (image) => {
        const images = ['not_found', 'nothing', undefined, null];
        return images.includes(image);
    }
    const collected = (amount, goal) => {
        if (!amount || !goal) {
            return 0;
        }
        return amount / goal;
    }
    const amountCollected = collected(0, route.params.project.goal);
    return (
        <ScrollView>
            <View style={{marginHorizontal: 20}}>
                <Divider width={6} color={'transparent'}/>
                {
                    defaultImage(route.params.project.image) ?
                        (<Image
                            source={require('../../images/default.jpg')}
                            style={ProjectDetailStyleSheet.ImageStyle}
                            containerStyle={ProjectDetailStyleSheet.ImageContainerStyle}/>) :
                        (<Image
                            source={{uri: route.params.project.image}}
                            style={ProjectDetailStyleSheet.ImageStyle}
                            containerStyle={ProjectDetailStyleSheet.ImageContainerStyle}/>)
                }
                <Text style={{fontSize: 30}}>{route.params.project.name}</Text>
                <ProjectDetailKeyValueText projectKey={'Created By'} projectValue={'User'}/>
                <Divider width={20} color={'transparent'}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='explore'
                              type='material'
                              size={20}
                              color='#85929d'/>
                        <Text style={ProjectCardStyleSheet.secondText}>
                            {route.params.project.type}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='room'
                              type='material'
                              size={20}
                              color='#85929d'/>
                        <Text style={ProjectCardStyleSheet.secondText}>
                            {route.params.project.location}
                        </Text>
                    </View>
                </View>
                <Text style={ProjectDetailStyleSheet.hashtags}>
                    {route.params.project.hashtags}
                </Text>
                <Divider width={20} color={'transparent'}/>
                <LinearProgress
                    style={{height: 8}}
                    value={amountCollected}
                    color={'#4b1e4d'}
                    variant={"determinate"}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ProjectDetailKeyValueText projectKey={'Collected'} projectValue={'0$'}/>
                    <ProjectDetailKeyValueText projectKey={'Goal'} projectValue={route.params.project.goal+'$'}/>
                </View>
                <Divider width={20} color={'transparent'}/>
                <ProjectDetailKeyValueText projectKey={'Finish date'} projectValue={route.params.project.endDate}/>
                <Divider width={20} color={'transparent'}/>
                <Text style={{fontSize: 20}}>{route.params.project.description}</Text>
                <Divider width={20} color={'transparent'}/>
                <SeedyFiubaButton title='Support' onPress={() => {
                    console.log('Support')
                }} style={ProjectDetailStyleSheet.button}/>
            </View>
        </ScrollView>
    )
}

export default ProjectDetailScreen