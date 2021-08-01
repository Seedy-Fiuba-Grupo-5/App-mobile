import {Alert, Text, View} from "react-native";
import SeedyFiubaButton from "./SeedyFiubaButton";
import ProjectEditStyleSheet from "../Styles/ProjectEditStyleSheet";
import React, {useEffect, useState} from "react";
import UseAuth from "./UseAuth";
import ApiProject from "../../model/ApiProject";
import LoadingText from "./LoadingText";
import ApiUser from "../../model/ApiUser";

const SeerReleaseFunds = ({stage, cost,projectId,wasReleased,onSuccess}) => {
    const [buttonDisable, setButtonDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const {id,jwt} = UseAuth();
    useEffect(() => {
        setButtonDisable(wasReleased);
    }, [wasReleased]);
    const completeStage = () => {
        console.log(jwt);
        setIsLoading(true);
        ApiProject.completeStage(projectId, jwt, id, stage+1)
            .then((data)=>{
                setIsLoading(false);
                setButtonDisable(true);
                onSuccess();
                console.log(data);
                Alert.alert('Successfully');
            })
            .catch((error)=>{
                setIsLoading(false);
                if (error.response.status !== undefined) {
                    Alert.alert(error.response.data.status);
                } else {
                    Alert.alert('Something went wrong');
                }
            })
    }
    return(
        <View>
            <View style={{flexDirection:"row", justifyContent:'space-between', paddingBottom:5}}>
                <Text style={{fontSize:20}}>Stage {stage+1}</Text>
                <Text style={{fontSize:20}}> Amount: {parseFloat(cost).toFixed(4)} $ </Text>
            </View>

            {
                isLoading?
                    (
                        <LoadingText/>
                    ) : (
                        <SeedyFiubaButton
                            disable={buttonDisable}
                            title={"Complete Stage " + (stage+1)}
                            onPress={()=>{completeStage()}}
                            style={{
                                margin:2,
                                backgroundColor: '#4b1e4d',
                                borderRadius: 15,
                                width: '50%',
                                alignSelf: 'center'
                            }}
                            titleStyle={ProjectEditStyleSheet.title}/>
                    )
            }
        </View>
    )
}
export default SeerReleaseFunds