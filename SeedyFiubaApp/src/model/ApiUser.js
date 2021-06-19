import axios from 'axios';
import {URL_LOCAL_GATEWAY} from '@env'
import User from "./User";
import Project from "./Project";
import Projects from "./Projects";

class ApiUser {
    constructor() {
        this.baseUrl = URL_LOCAL_GATEWAY;
    }

    async postProject(user_id, project) {
        const url = this.baseUrl  + '/users/' + user_id +'/projects';
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

    async register(firsName, lastName, email, password) {
        const url = this.baseUrl + '/users';
        const response = await axios.post(url,{
            name : firsName,
            lastName : lastName,
            email : email,
            password : password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    async getMyProjects(user_id) {
        const url = this.baseUrl  + '/users/' + user_id +'/projects';
        const response = await axios.get(url);
        if (response.status !== 200) {
            return new Projects([]);
        }
        const jsonData = response.data;
        return new Projects(jsonData);
    }

    async login(email,password) {
        const url = this.baseUrl + '/users/login';
        const response = await axios.post(url, {
            email:email,
            password:password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }
}
export default ApiUser