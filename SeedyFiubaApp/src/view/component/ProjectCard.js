import React from 'react';
import { Card} from 'react-native-elements'
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import Icon from "react-native-vector-icons/FontAwesome5";
import ProjectCardFinancialInfo from "./ProjectCardFinancialInfo";
import ProjectCardBottomItem from "./ProjectCardBottomItem";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

const ProjectCard = (props) => {
    return(
        <>
            <TouchableOpacity onPress={props.onPress}>
                <Card containerStyle={styles.projectCard}>
                    <Card.Image source={require('../images/default.jpg')}
                                style={styles.image}>
                    </Card.Image>
                    <View style={styles.projectCardItemsView}>
                        <Card.Title style={styles.projectCardTitle}>
                            {props.project.name}
                        </Card.Title>
                        <Text ellipsizeMode="tail"
                              numberOfLines={2}
                              style={styles.projectDescription}>
                            {props.project.description}
                        </Text>
                        <LinearProgress value={0.5}
                                        color={'#009688'}
                                        variant={"determinate"}/>
                        <ProjectCardFinancialInfo project={props.project}/>

                        <View
                            style={{ flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: 10,
                                paddingLeft:1,
                                paddingRight: 10}}>
                            <ProjectCardBottomItem projectField={props.project.type}
                                iconName={'lightbulb'}
                                iconFamily={'font-awesome-5'}/>
                            <ProjectCardBottomItem projectField={props.project.location}
                                                   iconName={'map-marker-alt'}
                                                   iconFamily={'font-awesome-5'}/>
                        </View>
                    </View>


                </Card>
            </TouchableOpacity>
        </>
    )
}
export default ProjectCard;