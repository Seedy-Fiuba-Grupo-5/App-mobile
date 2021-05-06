import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProjectView} from './src/view/ProjectView';
import axios from 'axios';
import { Card,Header} from 'react-native-elements'

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
            <View >
                <Header
                    placement="center"
                    backgroundColor={'green'}
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'SEEDYFIUBA', style: { color: '#fff',paddingTop:4} }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>
            <View style={styleBody.container}>
                <ProjectView> Projecs: </ProjectView>
                {this.state.projects.map((project, index) => {
                    return (
                        <Card key = {project.id}>
                            <Card.Title>{project.name}</Card.Title>
                        </Card>
                    );
                })}
            </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
      alignItems: 'center'
  },
});
const styleBody = StyleSheet.create({
    container:{
        alignItems: 'flex-start'
    }
})
