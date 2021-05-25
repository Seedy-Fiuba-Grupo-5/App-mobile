import React from 'react';
import {View} from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const GooglePlacePicker  = (props) => {
    return(
        <>
            <View
                style={{
                    flex: 1,
                }}>
                <GooglePlacesAutocomplete
                    styles={{
                        poweredContainer: {
                            backgroundColor: 'transparent',
                        },
                        textInput: {
                            backgroundColor: 'transparent',
                            height: 28,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            fontSize: 15,
                            flex: 1,
                        },
                        listView: {},
                        row: {
                            backgroundColor: 'transparent',
                            borderBottomWidth: 1,
                        },
                    }}
                    textInputProps={{
                        placeholderTextColor:"#86939e",
                        fontSize: 18,
                        paddingLeft: 5,
                    }}
                    placeholder='Buenos Aires, Argentina'
                    keyboardShouldPersistTaps = {'handled'}
                    getDefaultValue={() => ''}

                    onPress={(data, details) => {
                        this.setAddressText(data.description);
                        props.setFieldValue('location', data.description);
                    }}
                    query={{
                        key: 'GOOGLE API KEY',
                        language: 'en',
                    }}
                />
            </View>
        </>
    )
}
export default GooglePlacePicker;