import {Card, Icon} from "react-native-elements";
import {Text, TouchableOpacity, View} from "react-native";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import React from "react";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import moment from "moment";

const ProjectCard = (props) => {
    const collected = (amount, goal) => {
        if (!amount || !goal) {
            return 0;
        }
        return amount / goal;
    }
    const daysToEnd = (date) => {
        const today = moment().format('YYYY-MM-DD');
        let start = moment(today, "YYYY-MM-DD");
        let end = moment(date, "YYYY-MM-DD");
        return end.diff(start, 'days');
    }
    const defaultImage = (image) => {
        const images = ['not_found', 'nothing', undefined, null];
        return images.includes(image);
    }
    const amountCollected = collected(0, props.project.goal);
    const amountDays = daysToEnd(props.project.endDate);
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card containerStyle={ProjectCardStyleSheet.projectCard}>
                {defaultImage(props.project.image) ?
                    (<Card.Image source={require('../../images/default.jpg')}/>) :
                    (<Card.Image source={{uri: props.project.image}}/>)}
                <Card.Title
                    style={ProjectCardStyleSheet.title}>
                    {props.project.name}
                </Card.Title>
                <Card.FeaturedSubtitle numberOfLines={1} style={ProjectCardStyleSheet.description}>
                    {props.project.description}
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
                        {props.project.type}
                    </Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}
export default ProjectCard