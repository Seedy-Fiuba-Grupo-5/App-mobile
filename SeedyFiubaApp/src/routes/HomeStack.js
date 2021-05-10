import {createStackNavigator} from  'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import ProjectDetails from "../view/ProjectDetails";
import HomeScreen from "./HomeScreen";

const screens = {
    Home : {
        screen: HomeScreen
    },
    ProjectDetails: {
        screen: ProjectDetails
    },
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)