import {Alert, Text, View} from "react-native";
import SeedyFiubaButton from "./SeedyFiubaButton";
import ProjectEditStyleSheet from "../Styles/ProjectEditStyleSheet";
import React, {useState} from "react";
import UseAuth from "./UseAuth";
import ApiProject from "../../model/ApiProject";
import LoadingText from "./LoadingText";

const SeerReleaseFunds = ({stage, cost,projectId,wasReleased}) => {
    const [buttonDisable, setButtonDisable] = useState(wasReleased);
    const [isLoading, setIsLoading] = useState(false);
    const {id,jwt} = UseAuth();
    const completeStage = () => {
        console.log(jwt);
        setIsLoading(true);
        ApiProject.completeStage(projectId, jwt, id, stage+1)
            .then((data)=>{
                setIsLoading(false);
                setButtonDisable(true);
                console.log(data);
                Alert.alert('Successfully');
            })
            .catch((error)=>{
                setIsLoading(false);
                console.log(error);
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