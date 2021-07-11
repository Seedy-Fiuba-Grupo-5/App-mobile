import axios from 'axios';
import Projects from "./Projects";
import {URL_LOCAL_GATEWAY} from '@env'
import Project from "./Project";

class ApiProject {

    static async projects(params) {
        const url = URL_LOCAL_GATEWAY + '/projects';
        const response = await axios.get(url,{params:params});
        const jsonData = response.data;
        return new Projects(jsonData);
    }

    static async project(projectId) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Project(jsonData);
    }

    static async updateProject(projectId,token, project) {
        project.token = token;
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId;
        const response = await axios.patch(url, project);
        const jsonData = response.data;
        return new Project(jsonData);
    }

}
export default ApiProject