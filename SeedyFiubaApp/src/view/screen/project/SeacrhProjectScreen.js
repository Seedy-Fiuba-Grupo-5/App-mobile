import {Alert, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from 'react';
import {Header, Icon, Input, Overlay, SearchBar} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import ProjectEdit from "../../component/project/ProjectEdit";
import CreateProjectStyle from "../../Styles/CreateProjectStyleSheet";
import RNPickerSelect from "react-native-picker-select";
import ProjectEditStyleSheet from "../../Styles/ProjectEditStyleSheet";
import SeedyFiubaButton from "../../component/SeedyFiubaButton";
import ApiProject from "../../../model/ApiProject";
import ProjectCard from "../../component/project/ProjectCard";
import UseAuth from "../../component/UseAuth";
import Loading from "../../component/Loading";
import FilterProjectsStyleSheet from "../../Styles/FilterProjectsStyleSheet";
import SeedyFiubaEmpty from "../../component/SeedyFiubaEmpty";
import {isNaN} from "formik";
const SearchProjectScreen = ({navigation}) =>{
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [type,setType] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [radius, setRadius] = useState('');
    const [hashtag,setHashtag] = useState('');
    const [invalidHashtag, setInvalidHashtag] = useState(false);
    const [invalidLocation, setInvalidLocation] = useState(false);
    const [projects, setProjects] =useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const {id} = UseAuth();
    const clearData = () => {
        setType('');
        setHashtag('');
        setRadius('');
        setLat('');
        setLon('');
        setInvalidHashtag(false);
        setProjects([]);
    }
    const searchData = () => {
        if (!validHashtag()) {
            setInvalidHashtag(true);
            return;
        }

        if (!validLocation()) {
            setInvalidLocation(true);
            return;
        }
        setInvalidLocation(false);
        setInvalidHashtag(false);
        hideModal();
        search();
    }

    const validHashtag = () => {
        if (!isEmpty(hashtag)){
            return hashtag.charAt(0) === '#'
        }
        return true;
    }

    const validLocation = () => {
        let locations = [lat, lon, radius];
        for (let location of locations) {
            if (!isEmpty(location)) {
                let fLocation = parseFloat(location);
                if (isNaN(fLocation)) {
                    return false;
                }
            }
        }
        return true;
    }

    const isEmpty = (data) => {
        return data === '' || data == null;
    }
    const search = () => {
        const params = {};
        params.name = text;
        if (!isEmpty(type)) {
            params.type = type;
        }

        if (!isEmpty(hashtag)) {
            params.hashtag = hashtag;
        }
        
        if (!isEmpty(lat)) {
            params.lat = lat;
        }

        if (!isEmpty(lon)) {
            params.lon = lon;
        }

        if (!isEmpty(radius)) {
            params.radio = radius;
        }

        setIsLoading(true);
        ApiProject.projects(params)
            .then((data)=>{
                setIsLoading(false);
                setProjects(data.allProjects);
            })
            .catch((error)=>{
                setIsLoading(false);
                console.log(error);
            })
    }
    return(
        <>
            <Header
                leftComponent={
                    <Icon
                        name='arrow-back'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={() => {
                            navigation.goBack();
                        }}/>}
                centerComponent={
                    <SearchBar
                        searchIcon={{iconStyle: { color: '#fff'}}}
                        clearIcon={{iconStyle: { color: '#fff'}}}
                        onSubmitEditing={()=>search()}
                        onChangeText={(value)=>{setText(value)}}
                        value={text}
                        containerStyle={{
                            width:270,
                            backgroundColor:'transparent',
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            padding:0
                        }}
                        inputStyle={{color:'#fff'}}
                        inputContainerStyle={{
                            backgroundColor:'transparent',
                            borderColor:'#fff',
                            borderWidth: 1,
                            borderBottomWidth: 1,
                            height:20,
                            padding:0

                        }}
                    />
                }
                rightComponent={
                    <Icon
                        name='filter-alt'
                        type='material'
                        size={28}
                        color='#fff'
                        onPress={() => {
                            showModal();
                        }}/>
                }
                containerStyle={accountStyles.header}
            />
            <Overlay isVisible={visible} onBackdropPress={hideModal} overlayStyle={{height:400,width:300}}>
                <View style={{paddingTop:10,paddingBottom:10}}>
                    <Text
                        style={{
                            color:'#85929d',
                            fontWeight:'bold',
                            paddingLeft:13,
                            paddingBottom:10,
                            fontSize:18}}>
                        Type
                    </Text>
                    <RNPickerSelect
                        value={type}
                        style={{
                            inputAndroid: {
                                width: '95%',
                                alignSelf: 'center',
                                paddingBottom:28,
                                fontSize:40,
                                color:'black',
                            }
                        }}
                        onValueChange={(value)=>{setType(value)}}
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
                    <View>
                        <Text
                            style={{
                                color:'#85929d',
                                fontWeight:'bold',
                                paddingLeft:13,
                                paddingBottom:15,
                                paddingTop:10,
                                fontSize:18}}>
                            Location
                        </Text>
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-around'
                            }}
                        >
                            <Input
                                label={'Latitude'}
                                labelStyle={{fontSize:15}}
                                value={lat}
                                keyboardType={'numeric'}
                                onChangeText={(value)=>{setLat(value)}}
                                errorMessage={invalidLocation && 'Invalid Location' }
                                containerStyle={{width: '30%'}}
                                inputStyle={{fontSize:14}}
                            />
                            <Input
                                label={'Longitude'}
                                labelStyle={{fontSize:15}}
                                value={lon}
                                keyboardType={'numeric'}
                                onChangeText={(value)=>{setLon(value)}}
                                errorMessage={invalidLocation && 'Invalid Location' }
                                containerStyle={{width: '33%'}}
                                inputStyle={{fontSize:14}}
                            />
                            <Input
                                label={'Radius'}
                                labelStyle={{fontSize:15}}
                                value={radius}
                                keyboardType={'numeric'}
                                onChangeText={(value)=>{setRadius(value)}}
                                errorMessage={invalidLocation && 'Invalid Location'}
                                containerStyle={{width: '25%',alignSelf:'center'}}
                                inputStyle={{fontSize:14}}
                            />
                        </View>

                    </View>
                    <Text
                        style={{
                            color:'#85929d',
                            fontWeight:'bold',
                            paddingLeft:13,
                            paddingBottom:2,
                            fontSize:18}}>
                        Hashtag
                    </Text>
                    <Input value={hashtag}
                           onChangeText={(value)=>{setHashtag(value)}}
                           errorMessage={invalidHashtag && 'Invalid hashtag' }
                           leftIcon={<Icon name='tag'
                                           type='material'
                                           size={20}
                                           color='#BEBEBE'/>}
                           containerStyle={CreateProjectStyle.inputSearchContainer}
                    />

                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <SeedyFiubaButton
                        title='Clear'
                        onPress={()=>{clearData()}}
                        style={FilterProjectsStyleSheet.button}
                        titleStyle={FilterProjectsStyleSheet.title}/>
                    <SeedyFiubaButton
                        title='Search'
                        onPress={()=>{searchData()}}
                        style={FilterProjectsStyleSheet.button}
                        titleStyle={FilterProjectsStyleSheet.title}/>
                </View>
            </Overlay>

            {
                isLoading ?
                    (<Loading customStyle={{paddingTop:0}}/>) :
                    (
                        <ScrollView>
                            {
                                projects.length === 0?
                                    (
                                        <SeedyFiubaEmpty title={'Not Found Projects'}/>
                                    ):(projects.map((project) => {
                                        return (
                                            <ProjectCard key={project.id} project={project}
                                                         onPress={() => navigation.navigate("Project", {
                                                             project: project,
                                                             editable: false,
                                                             user: id
                                                         })
                                                         }/>
                                        )
                                    }))
                            }
                            <Text/>
                        </ScrollView>
                    )
            }
        </>
    )
}

export default SearchProjectScreen