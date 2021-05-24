import React from 'react';
import { Card} from 'react-native-elements'
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import Icon from "react-native-vector-icons/FontAwesome5";
import ProjectCardFinancialInfo from "./ProjectCardFinancialInfo";
import ProjectCardBottomItem from "./ProjectCardBottomItem";

const ProjectCard = (props) => {
    return(
        <>
            <TouchableOpacity onPress={props.onPress}>
                <Card containerStyle={styles.projectCard}>
                    <Card.Image source={require('../images/default.jpg')}
                                style={styles.image}>
                    </Card.Image>
                    <View
                    style={{
                        borderColor: '#BDBDBD',
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderBottomWidth: 0.5,
                        paddingLeft: 2.5,
                    }}>
                        <Card.Title
                            style={{
                                fontSize: 20,
                            }}>
                            {props.project.name}
                        </Card.Title>
                        <Text ellipsizeMode="tail"
                              numberOfLines={2}
                              style={{paddingBottom:5,
                                  color: '#757575',}}>
                            {props.project.description}
                        </Text>

                        <ProjectCardFinancialInfo project={props.project}/>

                        <View
                            style={{ flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingTop:10,}}>
                            <ProjectCardBottomItem project={props.project}/>
                            <Icon
                                raised
                                name='map-marker-alt'
                                type='font-awesome-5'
                                color='grey'/>
                            <Text>
                                {props.project.location}
                            </Text>
                        </View>
                    </View>


                </Card>
            </TouchableOpacity>
        </>
    )
}
export default ProjectCard;