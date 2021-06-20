import axios from 'axios';
import Projects from "./Projects";
import {URL_LOCAL} from '@env'
import Project from "./Project";

class ApiProject {
    constructor() {
        this.baseUrl = URL_LOCAL;
    }

    async get() {
        const url = this.baseUrl + '/projects';
        const response = await axios.get(url);
        if (response.status !== 200) {
            return new Projects([]);
        }
        const jsonData = response.data;
        return new Projects(jsonData);
    }
    async post(project) {
        const url = this.baseUrl + '/projects';
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
}
export default ApiProject