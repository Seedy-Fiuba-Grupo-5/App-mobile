import React, {useEffect, useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Header, Icon, Input} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import CommentCard from "../../component/CommentCard";
import ApiProject from "../../../model/ApiProject";
import UseAuth from "../../component/UseAuth";
import LoadingText from "../../component/LoadingText";
import Loading from "../../component/Loading";
import {ActivityIndicator} from "react-native-paper";

const ProjectCommentScreen =  ({navigation,route}) => {

    const [comments, setComments] = useState([]);
    const [update, setUpdate] = useState(0);
    const [projectId,setProjectId] = useState(route.params.projectId);
    const [loading,setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [comment, setComment] = useState('');
    const {id,jwt} = UseAuth();

    const sendComment =  () => {
        setSending(true);
        if (comment === '') {
            setSending(false);
            return;
        }
        ApiProject.sendComment(route.params.projectId,comment,id,jwt)
            .then((data)=>{
                setComment('');
                setSending(false);
                setUpdate(value=>value+1);
            })
            .catch((error)=>{
                setComment('');
                setSending(false);
                console.log(error);
            })
    }

    const getComments = (action) => {
        action(true);
        ApiProject.comments(route.params.projectId, id, jwt)
            .then((data)=>{
                action(false);
                setComments(data.allComments);
            })
            .catch((error)=>{
                action(false);
                console.log(error);
            })
    }

    useEffect(()=>{
        getComments(setLoading);
    },[update])

    useEffect(
        ()=>{
            setLoading(true);
            if (projectId !== route.params.projectId){
                setComments([]);
                setProjectId(route.params.projectId);
                getComments(setLoading);
                setLoading(false);
            }
            setLoading(false);
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

            <View style={{flexDirection:'row', justifyContent:'center',paddingTop:10}}>
                <Input
                    value={comment}
                    onChangeText={(value)=>{setComment(value)}}
                    containerStyle={{width: '82%',backgroundColor:'rgba(126,102,146,0.77)', borderRadius:15}}
                    inputStyle={{fontSize:20,color:'#fff'}}
                />
                {
                    sending ?
                        (
                            <View style={{paddingLeft:5,paddingTop:20}}>
                                <LoadingText/>
                            </View>
                        ) : (
                            <Icon name='send'
                                  type='material'
                                  onPress={()=>{sendComment()}}
                                  size={30}
                                  containerStyle={{paddingTop:20,paddingLeft:5}}
                                  color='#4b1e4d'/>
                        )
                }
            </View>
            <ScrollView >
                {
                    loading &&
                        <View style={{
                            position:'absolute',
                            elevation:20,
                            left:"45%",
                            bottom:'50%'

                        }}>
                            <ActivityIndicator size="Large" color="#4b1e4d"/>
                        </View>
                }
                {
                    comments.map((value,index) => {
                        console.log(value);
                        return(
                            <CommentCard key={index} comment={value.text} date={value.date}/>
                        )
                    })
                }
            </ScrollView>
        </>
    )


}
export default ProjectCommentScreen