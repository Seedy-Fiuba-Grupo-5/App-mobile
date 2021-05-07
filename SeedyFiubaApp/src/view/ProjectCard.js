import React from 'react';
import { Card} from 'react-native-elements'

const ProjectCard = (props) => {
    const styleCard ={
        borderWidth: 2,
        borderColor: "#6f6e6e",
        borderRadius: 20,
        elevation:5
    }
    return(
        <Card containerStyle={styleCard}>
            <Card.Title>
                {props.projectName}
            </Card.Title>
        </Card>
    )
}
export default ProjectCard;