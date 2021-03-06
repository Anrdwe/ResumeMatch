import { Paper } from "@material-ui/core"
import React from "react"
import "./jobCard-component.css"

import Grade from '../grade/grade-component'

const JobCard = ({ job }) => {

    let basicReqs =  job.basicreq ? job.basicreq.split(',') : []
    let bonusReqs = job.bonusreq ? job.bonusreq.split(',') : []

    let basicList = basicReqs.map((req,idx)=> (
        <li key={'basic'+idx}>
            {req}
        </li>
     ) ) 
     let bonusList = bonusReqs.map( (req,idx)=>(
         <li key={'bonus'+idx}>
             {req}
         </li>
     ))

    return (
        <Paper elevation={3} className="card-border">
            <div className="jobTitleArea">
                <h2 className="job-title">{job.jobname}</h2>
                <Grade grade={job.grade} />
            </div>
            <div>
                <h3 className="job-company">{job.companyname}</h3>
                <div className="list">
                    <div className="display-list">
                        <h3>Basic Requirements</h3>
                        <div className="basic-req">{basicList}</div>
                    </div>
                    <div className="display-list">
                        <h3>Bonus Requirements</h3>
                        <div className="bonusreq">{bonusList}</div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}
export default JobCard
