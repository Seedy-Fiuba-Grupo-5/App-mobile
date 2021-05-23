import React from 'react';
import { Card} from 'react-native-elements'
import {Text, TouchableOpacity} from "react-native";
import styles from "../Styles/StyleSheet";

const ProjectCard = (props) => {
    const styleCard = styles.projectCard
    return(
        <>
            <TouchableOpacity onPress={props.onPress}>
                <Card containerStyle={styleCard}>
                    <Card.Title>
                        {props.project.name}
                    </Card.Title>
                    <Card.Image source={require('../images/appLogo.png')}
                    style={styles.image}>
                    </Card.Image>
                    <Text>
                        {props.project.description}
                    </Text>
                </Card>
            </TouchableOpacity>
        </>
    )
}
export default ProjectCard;