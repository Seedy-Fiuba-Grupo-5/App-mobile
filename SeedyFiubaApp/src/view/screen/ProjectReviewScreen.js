import React from "react";
import ProjectReview from "../component/ProjectReview/ProjectReview";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <ProjectReview project={route.params.project}
                            editable={route.params.editable}/>
        </>
    )
}
export default ProjectReviewScreen;