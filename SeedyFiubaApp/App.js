import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProjectView from './src/view/ProjectView';
import axios from 'axios';
import { Card,Header} from 'react-native-elements'

export default class App extends Component{
    render(){
        return(
        <View style={styles.container}>
            <View >
                <Header
                    placement="center"
                    backgroundColor={'green'}
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'SEEDYFIUBA', style: { color: '#fff',paddingTop:4} }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>
            <ProjectView/>
        </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
});

