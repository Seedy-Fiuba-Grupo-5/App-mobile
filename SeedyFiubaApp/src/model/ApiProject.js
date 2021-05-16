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
        if (response.status !== 201) {
            return new Projects([]);
        }
        const jsonData = response.data;
        return new Projects(jsonData);
    }
    async post(name) {
        const url = this.baseUrl + '/projects';
        const response = await axios.post(url,{name:name});
        if (response.status !== 201) {
            return false;
        }
        const jsonData = response.data;
        return new Project(jsonData);
    }
}
export default ApiProject