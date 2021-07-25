import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {useState} from "react";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import {Formik, isNaN} from "formik";
import * as Yup from "yup";
import {Icon, Input} from "react-native-elements";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import ApiUser from "../../../model/ApiUser";
import UseAuth from "../../component/UseAuth";
import Firebase from "../../../model/Firebase";
import ApiProject from "../../../model/ApiProject";
import Loading from "../../component/Loading";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import ApiGoogle from "../../../model/ApiGoogle";

const NewProjectScreen = () => {
    const [date, setDate] = useState(new Date());
    const [locationId, setLocationId] = useState('');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {id,jwt} = UseAuth();

    const showMessage = (message) => {
        Alert.alert(message)
    }

    const isEmpty = (text) => {
        return text === '' || text === null;
    }

    const resetForm = (actions) =>{
        setImage(null);
        setVideo(null);
        actions.resetForm();
    }

    const updateMedia = async (data,image,video) => {
        let project = {};

        if (!isEmpty(image)) {
            project.image = await Firebase.uploadImage(data.id, image);
        }

        if (!isEmpty(video)) {
            project.video = await Firebase.uploadVideo(data.id,video);
        }

        return project;
    }

    const createProjectHandler = async (values,actions) => {
        resetForm(actions);
        setIsLoading(true);
        let goalInfo = getGoal(values.goal);
        let geometry =  await ApiGoogle.geometry(locationId);
        console.log(geometry);
        ApiUser.createProject(id, {
            name: values.name,
            description: values.description,
            hashtags: values.hashtags,
            type: values.type,
            goal: goalInfo.goal,
            endDate: formatDate(values.date),
            location: values.location,
            image: 'not_found',
            video: 'not_found',
            path: 'not_found',
            token: jwt,
            lat: geometry.lat,
            lon: geometry.lon,
            stagesCost: goalInfo.stagesCost
        })
            .then((data) => {
                console.log(data);
                updateMedia(data,values.image, values.video).then((url)=>{
                    ApiProject.updateProject(data.id, jwt, url).then((data) => {
                        setIsLoading(false);
                        showMessage('The Project Was Successfully Created');
                    }).catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                        showMessage('Failed To Create Project');
                    });
                })
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                showMessage('Failed To Create Project')
            });
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const selectVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos
        })
        if (!result.cancelled){
            setVideo(result.uri);
            return result.uri;
        }
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (!result.cancelled){
            setImage(result.uri);
            return result.uri;
        }
    }

    const onConfirm = (date,props) => {
        props.setFieldValue('date',date);
        props.validateField('date');
        setDate(date);
        setShow(false);
    };

    const selectLocation = (location,locationId,props) => {
        props.setFieldValue('location',location);
        props.validateField('location');
        setLocationId(locationId);
    };

    const onCancel = (date) => {
        setDate(new Date());
        setShow(false);
    };

    const formatDate = (date) => {
        let day = date.getDate();
        let mm = date.getMonth() + 1;
        let year = date.getFullYear();
        if ( day < 10){
            day = "0" + day;
        }
        if ( mm < 10){
            mm = "0" + mm;
        }
        return day + "/" + mm + "/" + year;
    }



    const validHashtag = (val) => {
        let hashtags = String(val).split(" ");
        let valid = true;
        hashtags.forEach((value,index,array) => {
            if (value.charAt(0) !== '#'){
                valid = false;
            }
        });
        return valid;
    }

    const validGoal = (val) => {
        let stages = String(val).split("-");
        let valid = true;
        for (let stage of stages) {
            let fStage = parseFloat(stage);
            if (isNaN(fStage)) {
                valid = false;
                break;
            }
            if (fStage>2) {
                valid = false;
                break;
            }
            if (fStage<0.1) {
                valid = false;
                break;
            }

        }
        return valid;
    }

    const getGoal= (val) => {
        let stages = String(val).split("-");
        let goal = 0;
        let stagesCost = [];
        for (let stage of stages) {
            let fStage = parseFloat(stage);
            goal = goal + fStage;
            stagesCost.push(fStage);
        }
        return {goal:goal, stagesCost:stagesCost};
    }

    if (isLoading){
        return (
            <Loading customStyle={{paddingTop:0}}/>);
    }else{
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            goal: '',
                            type:'Other',
                            hashtags:'',
                            date: new Date(),
                            location: '',
                            image:'',
                            video:''
                        }}
                        onSubmit={createProjectHandler}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(3, 'Invalid project name length')
                                .required('Required'),
                            description: Yup.string()
                                .min(3, 'Invalid project description length')
                                .required('Required'),
                            goal: Yup.string().test('',
                                'Invalid project goal',(val) => {
                                    return validGoal(val);
                                }).required('Required'),
                            type: Yup.string().oneOf(["Art","Comics",
                                "Crafts","Dance","Design","Fashion",
                                "Film & Video","Food","Games","Journalism",
                                "Music","Photography","Publishing","Technology",
                                "Theater","Other"])
                                .required('Required'),
                            hashtags: Yup.string().test('',
                                'Invalid project hashtags',(val) => {
                                    return validHashtag(val);
                                }).required('Required'),
                            date: Yup.date()
                                .min(moment().add(8, 'days'),'Invalid project end date')
                                .required('Required'),
                            location: Yup.string()
                                .min(3,'Invalid project location length')
                                .required('Required'),
                            image:Yup.string(),
                            video:Yup.string()
                        })}
                    >
                        {props => (
                            <View>
                                <Text style={{paddingTop:1}}/>
                                <Input value={props.values.name}
                                       label={'Name'}
                                       onChangeText={props.handleChange('name')}
                                       onBlur={props.handleBlur('name')}
                                       errorMessage={props.touched.name && props.errors.name}
                                       leftIcon={<Icon name='assignment'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}

                                />

                                <Input value={props.values.description}
                                       label={'Description'}
                                       onChangeText={props.handleChange('description')}
                                       onBlur={props.handleBlur('description')}
                                       multiline={true}
                                       errorMessage={props.touched.description && props.errors.description}
                                       leftIcon={<Icon name='article'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}
                                />
                                <Input value={props.values.goal}
                                       label={'Goal'}
                                       keyboardType={'numeric'}
                                       onChangeText={props.handleChange('goal')}
                                       onBlur={props.handleBlur('goal')}
                                       errorMessage={props.touched.goal && props.errors.goal}
                                       leftIcon={<Icon name='attach-money'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}

                                />

                                <Input value={props.values.hashtags}
                                       label={'Hashtags'}
                                       onChangeText={props.handleChange('hashtags')}
                                       onBlur={props.handleBlur('hashtags')}
                                       errorMessage={props.touched.hashtags && props.errors.hashtags}
                                       leftIcon={<Icon name='tag'
                                                       type='material'
                                                       size={20}
                                                       color='#BEBEBE'/>}
                                       containerStyle={CreateProjectStyle.inputContainer}/>

                                <View style={{paddingBottom:15}}>
                                    <Text style={{color:'#85929d',
                                        fontWeight:'bold',
                                        paddingLeft:46,
                                        paddingBottom:10,
                                        fontSize:16}}>Type</Text>
                                    <View style={{flexDirection:'row',
                                        justifyContent:'center',
                                        paddingLeft:55}}>
                                        <Icon name='title'
                                              type='material'
                                              size={20}
                                              color='#BEBEBE'/>
                                        <View style={{width:300}}>
                                            <RNPickerSelect
                                                value={props.values.type}
                                                style={{
                                                    inputIOS: CreateProjectStyle.pickerStyle,
                                                    inputAndroid: CreateProjectStyle.androidPicker
                                                }}
                                                onValueChange={props.handleChange('type')}
                                                items={[
                                                    {label: "Other", value: "Other"},
                                                    {label: "Art", value: "Art"},
                                                    {label: "Comics", value: "Comics"},
                                                    {label: "Crafts", value: "Crafts"},
                                                    {label: "Dance", value: "Dance"},
                                                    {label: "Design", value: "Design"},
                                                    {label: "Fashion", value: "Fashion"},
                                                    {label: "Film & Video", value: "Film & Video"},
                                                    {label: "Food", value: "Food"},
                                                    {label: "Games", value: "Games"},
                                                    {label: "Journalism", value: "Journalism"},
                                                    {label: "Music", value: "Music"},
                                                    {label: "Photography", value: "Photography"},
                                                    {label: "Publishing", value: "Publishing"},
                                                    {label: "Technology", value: "Technology"},
                                                    {label: "Theater", value: "Theater"}
                                                ]}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{color:'#85929d',
                                        fontWeight:'bold',
                                        paddingLeft:46,
                                        paddingBottom:10,
                                        fontSize:16}}>End date</Text>
                                    <TouchableOpacity onPress={()=>setShow(true)} style={{
                                        flexDirection:"row",
                                        paddingLeft:50
                                    }}>
                                        <Icon name='event'
                                              type='material'
                                              size={20}
                                              color='#BEBEBE'
                                              style={{paddingTop:2}}/>
                                        <Text style={{color:'black',fontSize:18,paddingLeft:20}}>
                                            {formatDate(props.values.date)}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        isVisible={show}
                                        testID="dateTimePicker"
                                        value={props.values.date}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        onCancel={onCancel}
                                        onConfirm={(date) => {onConfirm(date,props)}}
                                    />
                                    <Text style={CreateProjectStyle.errorText}>
                                        {props.errors.date}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{color:'#85929d',
                                        fontWeight:'bold',
                                        paddingLeft:46,
                                        fontSize:16}}>Location</Text>
                                    <Icon name='place'
                                          containerStyle={{
                                              position:'absolute',
                                              left:47,
                                              top:35
                                          }}
                                          type='material'
                                          size={20}
                                          color='#BEBEBE'/>

                                    <GooglePlacesAutocomplete
                                        placeholder=''
                                        styles={{
                                            textInput:{
                                                backgroundColor:'transparent',
                                                color:'black',
                                                fontSize:18

                                            },
                                            textInputContainer:{
                                                paddingLeft:18,
                                                width: '75%',
                                                alignSelf: 'center',
                                                borderBottomWidth:1,
                                                borderBottomColor:'#959ea7'

                                            },
                                            row:{
                                                backgroundColor:'transparent',
                                                borderColor:'#959ea7',
                                                borderWidth:0.5
                                            },
                                            listView:{
                                                width: '76%',
                                                alignSelf: 'center'
                                            },
                                            poweredContainer:{
                                                backgroundColor:'transparent',
                                                borderColor:'#959ea7',
                                                borderWidth:0.5
                                            }
                                        }}
                                        onPress={(data, details = null) => {
                                            selectLocation(data.description, data.place_id, props);
                                            console.log(locationId);
                                        }}
                                        nearbyPlacesAPI='GoogleReverseGeocoding'
                                        query={{
                                            key: 'AIzaSyBjMkW8M-Xa-Z6uJGT-RNFAJBtD9CD-EAs',
                                            language: 'en',
                                            types: 'geocode'
                                        }}
                                    />
                                    <Text style={CreateProjectStyle.errorText}>
                                        {props.errors.location}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{color:'#85929d',
                                        fontWeight:'bold',
                                        paddingLeft:46,
                                        paddingBottom:10,
                                        fontSize:16}}>Image</Text>
                                    <TouchableOpacity onPress={() => {
                                        selectImage().then((uri) => {
                                            props.setFieldValue('image',uri);
                                            props.validateField('image');
                                        })}} style={{
                                        flexDirection:"row",
                                        paddingLeft:50
                                    }}>
                                        <Icon name='image'
                                              type='material'
                                              size={20}
                                              color='#BEBEBE'
                                              style={{paddingTop:2}}/>
                                        {
                                            image != null ? (
                                                    <Image
                                                        source={{uri: image}}
                                                        style={{width: 200, height: 200}}/>):
                                                (<Text style={{color:'black',fontSize:18,paddingLeft:20}}>
                                                    Image
                                                </Text>)
                                        }
                                    </TouchableOpacity>
                                    <Text style={CreateProjectStyle.errorText}>
                                        {props.errors.image}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{color:'#85929d',
                                        fontWeight:'bold',
                                        paddingLeft:46,
                                        paddingBottom:10,
                                        fontSize:16}}>Video</Text>
                                    <TouchableOpacity onPress={() => {
                                        selectVideo().then((uri) => {
                                            props.setFieldValue('video',uri);
                                            props.validateField('video');
                                        })}} style={{
                                        flexDirection:"row",
                                        paddingLeft:50
                                    }}>
                                        <Icon name='movie'
                                              type='material'
                                              size={20}
                                              color='#BEBEBE'
                                              style={{paddingTop:2}}/>
                                        {
                                            video != null ? (
                                                    <Image
                                                        source={{uri: video}}
                                                        style={{width: 200, height: 200}}/>):
                                                (<Text style={{color:'black',fontSize:18,paddingLeft:20}}>
                                                    Video
                                                </Text>)
                                        }
                                    </TouchableOpacity>
                                    <Text style={CreateProjectStyle.errorText}>
                                        {props.errors.video}
                                    </Text>
                                </View>

                                <SeedyFiubaButton title='Create' onPress={props.handleSubmit}
                                                  style={CreateProjectStyle.principalButton}/>
                                <Text style={{paddingBottom:1}}/>
                            </View>
                        )
                        }
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        )

    }
}
export default NewProjectScreen