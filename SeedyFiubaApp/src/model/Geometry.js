class Geometry {
    constructor(geometry = []) {
        this.lat = 1.0;
        this.lon = 1.0;
        if (geometry.length !== 0) {
            this.lat = geometry.result.geometry.location.lat;
            this.lon = geometry.result.geometry.location.lng;
        }
    }

}
export default Geometry