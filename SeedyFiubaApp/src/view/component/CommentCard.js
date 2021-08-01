import {Card, Title} from "react-native-paper";
import {Text} from "react-native";
import React from "react";
const CommentCard = ({comment, date}) => {
    return (
        <Card style={{elevation:5,borderRadius:10,margin:10, marginLeft:15,marginRight:15}}>
            <Card.Content>
                <Title>{comment}</Title>
                <Text style={{color:'grey'}}>{date}</Text>
            </Card.Content>
        </Card>
    )
}

export default CommentCard