import ProjectReview from "../../component/ProjectReview/ProjectReview";
import React from "react";

const ProjectDetailView = ({route}) => {
    return (
        <ProjectReview project={route.params.project}
                       editable={route.params.editable}/>
    )

}
export default ProjectDetailView