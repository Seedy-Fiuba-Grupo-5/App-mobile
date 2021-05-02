import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProjectView} from './src/view/ProjectView';
import axios from "axios";

export default function App() {
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
  )
  return (
    <View style={styles.container}>
      <ProjectView> Holaaa </ProjectView>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
