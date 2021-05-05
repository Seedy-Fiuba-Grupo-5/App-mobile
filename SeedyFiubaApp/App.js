import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProjectView} from './src/view/ProjectView';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    getProjects(){
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(respuesta => respuesta.data)
            .then((data) => {
                this.setState({projects : data})
            });
    }
    componentDidMount() {
        this.getProjects();
    }

    render(){
        return(
        <View style={styles.container}>
            <Card>
                <Card.Title>HELLO WORLD</Card.Title>
                <Text>Hello world!</Text>
            </Card>
            <ProjectView> Projecs: </ProjectView>
            {this.state.projects.map((project, index) => {
                return (
                    <Text key = {project.id}>{project.name}</Text>
                );
            })}
            <StatusBar style="auto" />
        </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
