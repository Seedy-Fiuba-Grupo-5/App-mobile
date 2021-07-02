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
                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/seedyfiuba-a983e.appspot.com/o/image%2F1?alt=media&token=e0954e4c-0fd2-421a-b9ba-fce124c2bd1a'}}
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