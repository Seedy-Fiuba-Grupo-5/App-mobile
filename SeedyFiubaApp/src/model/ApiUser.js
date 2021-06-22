import axios from 'axios';
import {URL_LOCAL_GATEWAY} from '@env'
import User from "./User";
import Project from "./Project";
import Projects from "./Projects";

class ApiUser {

    static async createProject(user_id, project) {
        const url = URL_LOCAL_GATEWAY + '/users/' + user_id +'/projects';
        const response = await axios.post(url,{name:project.name,
            description:project.description, hashtags: project.hashtags, type: project.type,
            goal: parseInt(project.goal), endDate: project.endDate,
            location: project.location});
        if (response.status !== 201) {
            return false;
        }
        const jsonData = response.data;
        return new Project(jsonData);
    }


    static async register(firsName, lastName, email, password) {
        const url = URL_LOCAL_GATEWAY + '/users';
        const response = await axios.post(url,{
            name : firsName,
            lastName : lastName,
            email : email,
            password : password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async projects(user_id) {
        const url = URL_LOCAL_GATEWAY  + '/users/' + user_id +'/projects';
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Projects(jsonData);
    }


    static async login(email,password) {
        const url = URL_LOCAL_GATEWAY + '/users/login';
        const response = await axios.post(url, {
            email:email,
            password:password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async user(id) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async updateUser(id,firstName,lastName,email) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id;
        const response = await axios.patch(url,{
            name:firstName,
            lastName:lastName,
            email:email
        });
        const jsonData = response.data;
        return new User(jsonData);
    }
}
export default ApiUser