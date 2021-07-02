import axios from 'axios';
import Projects from "./Projects";
import {URL_LOCAL_GATEWAY} from '@env'
import Project from "./Project";
import Firebase from '../../firebase/Firebase';

class ApiProject {
    constructor() {
        Firebase.firebaseInit();
        this.baseUrl = URL_LOCAL_GATEWAY;
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

    async getProject(projectId) {
        const url = this.baseUrl + '/projects/' + projectId;
        const response = await axios.get(url);
        if (response.status !== 200) {
            return new Project({});
        }
        const jsonData = response.data;
        return new Project(jsonData);
    }

    async patch(projectId, project) {
        const url = this.baseUrl + '/projects/' + projectId;
        const response = await axios.patch(url, project);
        if (response.status !== 200) {
            return new Project([]);
        }
        const jsonData = response.data;
        return new Project(jsonData);
    }

}
export default ApiProject