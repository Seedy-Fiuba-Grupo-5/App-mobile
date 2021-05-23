import React, {useState} from 'react';
import {Input} from 'react-native-elements'
import styles from "../Styles/StyleSheet";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "@react-native-community/datetimepicker";
import moment from "moment";

const FormikDatePicker = (props) => {
    const [date, setDate] = useState(moment().add(8,'days').toDate());
    const [dateButtonText, setDateButtonText] = useState('Select an End Date...')
    const [dateTextStyle, setDateTextStyle] = useState(styles.placeholderText)

    const showDatepicker = () => {
        if (props.show[0]){
            props.show[1](false);
            setDateButtonText(date.toDateString());
            setDateTextStyle(styles.enteredDataText);
        } else {
            props.show[1](true);
            setDateButtonText('Confirm End Date');
            setDateTextStyle(styles.placeholderText);
        }
    };

    return(
        <>
            <Text style={styles.labelText}>End Date</Text>
            <TouchableOpacity
                onPress={showDatepicker}
                style={styles.formOnTouchableOpacity}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                    <Icon name={'calendar-week'} size={26}/>
                    <Text
                        style={dateTextStyle}>
                        {dateButtonText}
                    </Text>
                </View>
            </TouchableOpacity>
            {props.show[0] && (
                <View>
                    <DateTimePickerModal
                        testID="dateTimePicker"
                        value={date}
                        minimumDate={moment().add(8,'days').toDate()}
                        mode={'date'}
                        display="default"
                        onChange={ (event, value) => {
                            setDate(value);
                            props.formikProps.setFieldValue('endDate', value.toDateString());
                        }}
                    />
                </View>
            )}
            <Text style={styles.errorText}>{props.formikProps.touched.endDate
            && props.formikProps.errors.endDate}</Text>
        </>
    )
}
export default FormikDatePicker;