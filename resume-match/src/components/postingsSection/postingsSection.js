import React from "react"
import "./postingsSection.css"

import JobCard from "../jobCard/jobCard-component"

const PostingsSection = ({
    onJobSelect,
    numJobsPerPage,
    pageNumber,
    displayableJobs
}) => {

    let jobList = displayableJobs.map((job, idx) => (
        <div key={job.jobkey+idx} onClick={() => onJobSelect(idx)}>
            <JobCard job={job} />
        </div>
    ))

    let displayJobList = []
    let jobsDisplayed = 0;
    
    //based on current page number, what index in jobList are we at
    let startIndex = ( (pageNumber-1) *numJobsPerPage )

    // iterates through job list and gets max number of jobs after start index
    for (let i = startIndex; i< jobList.length; i++){
        displayJobList.push(jobList[i])
        jobsDisplayed +=1
        if (jobsDisplayed >=numJobsPerPage){
            break;
        }
    }

    return <div>{displayJobList}</div>
}

export default PostingsSection
