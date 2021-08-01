class Seer {
    constructor(seer={}) {
        if (seer.length === 0) {
            this.projects = [];
        }else {
            this.projects = seer.projects_info;
        }
    }
}

export default Seer