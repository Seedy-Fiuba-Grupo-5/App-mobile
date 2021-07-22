import {Card, Icon} from "react-native-elements";
import {Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import React from "react";
import ProjectCardStyleSheet from "../../Styles/ProjectCardStyleSheet";
import moment from "moment";

const ProjectCard = (props) => {
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
    const amountDays = daysToEnd(props.project.endDate);
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card containerStyle={ProjectCardStyleSheet.projectCard}>
                {defaultImage(props.project.image) ?
                    (<Image
                        source={require('../../images/default.jpg')}
                        style={{width:300, height:150,  alignSelf: "center"}}
                    />) :
                    (<Image
                        source={{uri: props.project.image}}
                        style={{width:300, height:150, alignSelf: "center"}}/>)}
                <Card.Title
                    style={ProjectCardStyleSheet.title}>
                    {props.project.name}
                </Card.Title>
                <Card.FeaturedSubtitle numberOfLines={1} style={ProjectCardStyleSheet.description}>
                    {props.project.description}
                </Card.FeaturedSubtitle>
                <Card.Divider color={'#4b1e4d'}/>
                <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                    <View style={{flexDirection: "row", justifyContent: 'center'}}>
                        <Icon name='explore'
                              type='material'
                              size={20}
                              color='#85929d'/>
                        <Text style={ProjectCardStyleSheet.secondText}>
                            {props.project.type}
                        </Text>
                    </View>
                    <Text style={ProjectCardStyleSheet.principalText}>
                        {amountDays} <Text style={ProjectCardStyleSheet.secondText}>
                        Days to end</Text>
                    </Text>
                </View>
                <Card.Divider color={'white'}/>


            </Card>
        </TouchableOpacity>
    )
}
export default ProjectCard