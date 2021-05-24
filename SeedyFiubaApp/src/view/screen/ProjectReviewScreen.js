import React from "react";
import ProjectReview from "../component/ProjectReview";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <ProjectReview project={route.params.project}/>
        </>
    )
}
export default ProjectReviewScreen;