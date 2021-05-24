import React from "react";
import {Image, View} from "react-native";

const ProjectReviewImage = (props) => {
    return (
        <>
            <View
                style={{
                    width:'95%',
                    height: 220,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <Image source={require('../images/default.jpg')}
                       resizeMode={'contain'}
                       style={{
                           flex: 1,
                           alignSelf: 'stretch',
                           width: undefined,
                           height: undefined
                       }}
                />
            </View>
        </>
    )
}
export default ProjectReviewImage