import React, {useEffect, useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Header, Icon, Input} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import CommentCard from "../../component/CommentCard";

const ProjectCommentScreen =  ({navigation,route}) => {

    const [comments, setComments] = useState([]);
    const [update, setUpdate] = useState(0);
    const [id,setId] = useState(route.params.projectId);
    const [loading,setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const sendComment =  () => {
        setUpdate(value=>value+1);
    }

    useEffect(()=>{
        console.log(update);
        console.log('Project: ',id);
        if (comment !== '') {
            setComments(values=>[...values, {comment: comment,commenter: 2}]);
            setComment('');
        }
    },[update])

    useEffect(
        ()=>{
            if (id !== route.params.projectId){
                setId(route.params.projectId);
                setComments([]);
            }
        }
    )
    return(
        <>
            <Header
                leftComponent={
                    <Icon
                        name='arrow-back'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={() => {
                            navigation.goBack();
                        }}/>}
                centerComponent={
                    <Text
                        style={accountStyles.text}>
                        Comments
                    </Text>}
                containerStyle={accountStyles.header}
            />
            <Text style={{fontSize:35}}>{id}</Text>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Input
                    value={comment}
                    onChangeText={(value)=>{setComment(value)}}
                    containerStyle={{width: '82%',backgroundColor:'rgba(126,102,146,0.77)', borderRadius:15}}
                    inputStyle={{fontSize:20,color:'#fff'}}
                />
                <Icon name='send'
                      type='material'
                      onPress={()=>{sendComment()}}
                      size={30}
                      containerStyle={{paddingTop:20,paddingLeft:5}}
                      color='#4b1e4d'/>
            </View>
            <ScrollView >
                {
                    comments.map((value,index) => {
                        return(
                            <CommentCard key={index} comment={value.comment} commenter={value.commenter}/>
                        )
                    })
                }
            </ScrollView>
        </>
    )


}
export default ProjectCommentScreen