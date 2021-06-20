import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

const ProjectReviewImage = (props) => {
    return (
        <>
            <TouchableOpacity disabled={!props.editable}
                              onPress={() => {
                                  alert('This Field Cannot be Modified');
                              }}>
                <View
                    style={{
                        width:'95%',
                        height: 220,
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <Image source={require('../../images/default.jpg')}
                           resizeMode={'contain'}
                           style={{
                               flex: 1,
                               alignSelf: 'stretch',
                               width: undefined,
                               height: undefined
                           }}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}
export default ProjectReviewImage