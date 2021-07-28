import {Card, Paragraph, Title} from "react-native-paper";
import {Text} from "react-native";
import React from "react";
const CommentCard = ({comment, commenter}) => {
    return (
        <Card style={{elevation:5,borderRadius:10,margin:10}}>
            <Card.Content>
                <Title>{comment}</Title>
            </Card.Content>
        </Card>
    )
}

export default CommentCard