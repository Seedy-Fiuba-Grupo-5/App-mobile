import React from 'react';
import { Card} from 'react-native-elements'
import {View, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

const ProjectCard = (props) => {
    const styleCard ={
        borderWidth: 2,
        borderColor: "#6f6e6e",
        borderRadius: 20,
        elevation:5
    }
    const  navigation = useNavigation()

    return(
        <View>
            <Card containerStyle={styleCard}>
                <TouchableOpacity onPress={() => navigation.navigate('ProjectDetails')}>
                    <Card.Title>
                        {props.projectName}
                    </Card.Title>
                </TouchableOpacity>
            </Card>
        </View>
    )
}
export default ProjectCard;