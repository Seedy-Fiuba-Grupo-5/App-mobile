import React,{Component} from "react";
import {View,Text} from "react-native";
export class ProjectView extends Component{
    state = {
        project: "",
    };
    constructor(props) {
        super(props);
        this.state = {
            project: props.children
        };
    }
    render() {
        return (
            <View>
                <Text>
                    {this.state.project}
                </Text>
            </View>
        );
    }
}