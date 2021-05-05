import React,{Component} from "react";
import {View,Text} from "react-native";
export class ProjectView extends Component{
    constructor(props) {
        super(props);
        this.state = {project: ""}
    }
    componentDidMount() {
        this.setState({project:this.props.children});
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