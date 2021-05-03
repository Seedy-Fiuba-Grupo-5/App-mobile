import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProjectView} from './src/view/ProjectView';
import axios from "axios";
const URL = 'http://localhost:5000/'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    getProjects(){
        axios.get(URL+'projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                this.setState({projects : data})
            });
    }
    componentDidMount() {
        this.getProjects();
    }
/*
    const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000
    });
    api.get('/projects').
    then(response => response.data)
    .then((data) => {
        alert(data)
        this.setState({projects: data})
    });
    /*
    const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000
    });
    api.get('/posts').then((response) => {
    const data = response['data'];
    console.log('Respuesta');
    console.log(data.length);
    console.log(data[2]);
    //console.log(data);
    }).catch((error) =>{
    console.log(error);
      }
    )*/
    render(){
        return(
            <View style={styles.container}>
              <ProjectView> Projects: </ProjectView>
              {this.state.projects.map((project, index) => {
                    return (
                        <Text>{project}</Text>
                    );
              })}
              <StatusBar style="auto" />
            </View>
        )
    }
    /*
    return (
    <View style={styles.container}>
      <ProjectView> {this.state.projects} </ProjectView>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
