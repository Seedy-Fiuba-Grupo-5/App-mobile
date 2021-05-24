import React from 'react';
import { Card} from 'react-native-elements'
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import Icon from "react-native-vector-icons/FontAwesome5";

const ProjectCard = (props) => {
    const styleCard = styles.projectCard
    return(
        <>
            <TouchableOpacity onPress={props.onPress}>
                <Card containerStyle={styleCard}>
                    <Card.Image source={require('../images/appLogo.png')}
                                style={styles.image}>
                    </Card.Image>
                    <Card.Title>
                        {props.project.name}
                    </Card.Title>
                    <Text ellipsizeMode="tail"
                        numberOfLines={2}
                    style={{paddingBottom:5}}>
                        {props.project.description}
                    </Text>
                    <LinearProgress value={0.5}
                    color={'green'}
                    variant={"determinate"}/>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            paddingTop:10,
                        }}>
                        <View
                            style={{paddingRight: 7}}>
                            <Text>
                                Ends on:
                            </Text>
                            <Text>
                                {props.project.endDate}
                            </Text>
                        </View>
                        <View
                            style={{paddingRight: 7}}>
                            <Text>
                                AR$ 0
                            </Text>
                            <Text>
                                pledged of AR$ {props.project.goal}
                            </Text>
                        </View>
                        <View
                            style={{paddingRight: 7}}>
                            <Text>
                                0
                            </Text>
                            <Text>
                                Supporters
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            paddingTop:10,
                        }}>
                        <Icon
                            raised
                            name='tag'
                            type='font-awesome-5'
                            color='grey'/>
                        <Text>
                            {props.project.type}
                        </Text>
                        <Icon
                            raised
                            name='map-marker-alt'
                            type='font-awesome-5'
                            color='grey'/>
                        <Text>
                            {props.project.location}
                        </Text>
                    </View>

                </Card>
            </TouchableOpacity>
        </>
    )
}
export default ProjectCard;