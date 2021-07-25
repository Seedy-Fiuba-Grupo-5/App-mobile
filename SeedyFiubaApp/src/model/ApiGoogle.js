import axios from "axios";
import {URL_GOOGLE,GOOGLE_API_KEY} from '@env'
import Geometry from "./Geometry";

class ApiGoogle {

    static async geometry(locationId) {
        const url = URL_GOOGLE;
        const response = await axios.get(url,
            {params:{
                        place_id:locationId,
                        key:GOOGLE_API_KEY,
                    }});
        const jsonData = response.data;
        return new Geometry(jsonData);
    }

}
export default ApiGoogle