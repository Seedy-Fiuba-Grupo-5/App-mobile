import {KeyboardAvoidingView, Platform, ScrollView,View} from "react-native";
import {Rating} from "react-native-elements";
import SeedyFiubaButton from "../SeedyFiubaButton";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import React, {useState} from "react";
import ApiProject from "../../../model/ApiProject";

const RateProject = ({projectId, close}) => {
    const [rating, setRating] = useState(1);
    const rateProject = () => {
        ApiProject.rateProject(projectId, rating)
            .then((data) => {
                console.log(data);
                close();
            })
            .catch((error) => {
                console.log(error);
                close();
            });
    }

    const ratingCompleted = (rating) => {
        setRating(rating);
    }

    return(
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <View>
                    <Rating
                        onFinishRating={ratingCompleted}
                    />
                    <SeedyFiubaButton
                        title='Send'
                        onPress={rateProject}
                        style={ProjectEditStyleSheet.button}
                        titleStyle={ProjectEditStyleSheet.title}
                    />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default RateProject