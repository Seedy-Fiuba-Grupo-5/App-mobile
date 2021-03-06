class Projects {
    constructor(projects) {
        this.allProjects = [];
        projects.map((project) => {
            this.allProjects.push({
                id: project.id,
                name: project.name,
                description: project.description,
                type: project.type,
                hashtags: project.hashtags,
                goal: project.goal,
                image:project.image,
                endDate: project.endDate,
                location: project.location,
                createdOn:project.createdOn,
                video:project.video,
                favorites:project.favorites,
                rating:project.rating,
                lat:project.lat,
                lon:project.lon
            });
        })
    }
}
export default Projects