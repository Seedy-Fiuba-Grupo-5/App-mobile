import axios from 'axios';
export class Api{
    constructor(url) {
        console.log(url);
        this.baseUrl = url;
    }
    get = async (endpoint) => {
        const algo = await axios.get(this.baseUrl+endpoint);
        return JSON.stringify(algo, null, 2);
    }
}