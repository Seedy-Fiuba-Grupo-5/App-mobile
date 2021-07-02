import React, {useState} from 'react';
import styles from "../../Styles/StyleSheet";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import * as firebase from 'firebase';
import Firebase from '../../../../firebase/Firebase'

const FormikImagePicker = (props) => {

    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

        })
        if (!result.cancelled){
            Firebase.firebaseInit();
            setImage(result.uri);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            var ref = firebase.storage().ref().child('users/' + props.id +'/temp/' + 'coverImage')
            await ref.put(blob);
            var loque = await firebase.storage().ref('users/' + props.id + '/temp/').child('coverImage').getDownloadURL()
            console.log(loque);
        }
    }

    return(
        <>
            <Text style={styles.labelText}>Cover Image</Text>
            <TouchableOpacity
                onPress={async () => {
                    await pickImage();
                }}
                style={styles.formOnTouchableOpacity}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                    <Icon name={'image'} size={26}/>
                    <Text
                        style={styles.placeholderText}>
                        Select Image
                    </Text>
                </View>
            </TouchableOpacity>
            {image && <View
                    style={{alignItems: 'center'}}>
                <Image source={{uri: image} } style={{width: 200,
                    height: 200}}/>
            </View>}
        </>
    )
}
export default FormikImagePicker;