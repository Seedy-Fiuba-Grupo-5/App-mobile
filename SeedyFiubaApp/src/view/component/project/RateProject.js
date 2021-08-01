import {ToastAndroid, View} from "react-native";
import {Icon, Input, Rating} from "react-native-elements";
import React, {useState} from "react";
import UseAuth from "../UseAuth";
import ApiProject from "../../../model/ApiProject";

const RateProject = ({projectId,close}) => {
    const {id} = UseAuth();
    const [rating, setRating] = useState(1);
    const rateProject = () => {
        ApiProject.rateProject(id, projectId, rating)
            .then((data) => {
                console.log(data);
                ToastAndroid.show('Feedback Sent',ToastAndroid.SHORT);
                close();
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show('We cant sent feedback',ToastAndroid.SHORT);
                close();
            });
    }

    return(
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: "center"}}>
                <Rating
                    type='star'
                    startingValue={1}
                    onFinishRating={(rating) => {
                        setRating(rating);
                        console.log("Rating: "+rating);
                    }}
                />
                <Icon
                    name='send'
                    type='material'
                    containerStyle={{paddingTop:5,paddingLeft:10}}
                    size={30}
                    color='#4b1e4d'
                    onPress={() => {
                        rateProject();
                    }}
                />
            </View>
        </View>
    )
}
export default RateProject