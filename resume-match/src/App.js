// import logo from "./logo.svg"
import "./App.css"
import React, { useState, useEffect } from "react"
import { Pagination } from "@material-ui/lab"

import Upload from "./components/upload/upload-component"
import PostingsSection from "./components/postingsSection/postingsSection"
import DetailedPosting from "./components/detailedPosting/detailedPosting-component"
import Filter from "./components/filter/filter-component"

function App() {
    let samplePosting = {
        companyname: "Amazon",
        descrip: `<div class="jobsearch-jobDescriptionText" id="jobDescriptionText"><div>Provides data collection, data management, data analysis and reporting, and decision management tool design and development. Responsible for interfacing with IT to ensure utilization and effective use of IT sponsored tools. Provide basic programming and technical skills to support data management and reporting requirements.
        <ul><li>Work with designated department to assess, define, and develop report deliverables to meet internal and customer requirements. Design appropriate data repository and reporting tools that will be used to organize, analyze, and report data. Query databases to extract information needed to develop reports. Compile data and other information from multiple data sources.
        </li><li>Support the development of standardized reports.
        </li><li>Interpret, analyze and provide recommendations regarding data accuracy and data collection needs and processes. Work with business unit(s) to identify opportunities to enhance existing and to develop new data information processes and tools. Continuously assess and improve data collection and reporting processes.
        </li><li>Coordinate or independently complete special projects. Assist staff members with more complex and detailed projects including root cause analyses, trended reporting and analyses which support continuous quality improvement leading to actionable information.
        </li><li>Participate and support staff training related to data collection and reporting.
        </li><li>Other duties as assigned.
        </li><li>Uses MS SQL / SSIS and SAS to load, validate, and report on client data. Also performs ad-hoc database analyses to generate reports based on provided criteria.
        </li><li>Enhance existing systems by analyzing business objectives, developing an action plan and identifying areas for improvement.
        </li><li>Experience with Microsoft SQL Server and / or Oracle is required.
        </li><li>Experience working within Health Care data environment preferred.
        </li></ul><p></p><p>#LI-KB1
        </p><p></p><p><b>Other Job Requirements
        </b></p><p></p><p><b>Responsibilities
        </b></p><ul><li>Bachelor's degree in Business Administration, Computer Science, IT, Mathematics or related field.
        </li><li>May consider an additional 3-4 years of relevant experience in lieu of Bachelor's degree.
        </li><li>Requires strong expertise in MS Excel and relational database such as MS Access and other database management (MS SQL) and reporting tools.
        </li><li>Ability to use reporting software such as Actuate, Cognos, Crystal reports, SAS, or other.
        </li><li>Ability to query the company's data warehouse and/or department systems in response to data requests.
        </li><li>Strong interpersonal skills.
        </li><li>Strong written and verbal communication skills.
        </li></ul><ul><li>Database management.
        </li><li>Exposure to web based or mobile application development.
        </li></ul><p></p><p><b>General Job Information
        </b></p><p></p><p><b>Title
        </b></p>SQL ETL and Reporting Analyst
        <p></p><p><b>Grade
        </b></p>23
        <p></p><p><b>Work Experience
        </b></p>Analytics/Informatics, Managed Healthcare
        <p></p><p><b>Education
        </b></p>A Combination of Education and Work Experience May Be Considered. (Required), Bachelors: Business Administration (Required), Bachelors: Computer and Information Science (Required), Bachelors: Information Technology (Required), Bachelors: Mathematics (Required)
        <p></p><p><b>License and Certifications - Required
        </b></p><p></p><p><b>License and Certifications - Preferred
        </b></p><p></p><p>Magellan Health Services is proud to be an Equal Opportunity Employer and a Tobacco-free workplace. EOE/M/F/Vet/Disabled. Every employee must understand, comply and attest to the security responsibilities and security controls unique to their position.</p></div></div>`,
        jobkey: "amazon",
        jobname: "Software Developer Engineer",
        basicreq: `Knowledge of Perl or other scripting languages a plus, Experience with distributed (multi-tiered) systems, algorithms and relational databases,Experience in optimization mathematics (linear programming, nonlinear optimization),Ability to effectively articulate technical challenges and solutions`,
        bonusreq: "Previous technical internship(s) preferred",
        location: "Toronto, ON",
        salary: "28$/hr",
        url: "indeed.com",
        grade: "0.75",
    }
    let samplePostings = []

    for (let i = 0; i < 14; i++) {
        samplePostings.push(samplePosting)
    }

    const [jobPostings, setJobPostings] = useState(samplePostings)
    const [selectedJob, setSelectedJob] = useState(null)
    const [displayableJobs, setDisplayableJobs] = useState([])

    const [filterGrade, setFilterGrade] = React.useState("")
    const [filterDistance, setFilterDistance] = React.useState("")
    const [filterSalary, setFilterSalary] = React.useState(0)

    const [pageNumber, setPageNumber] = useState(1)

    const numJobsPerPage = 6

    useEffect(() => {
        // TODO: use filters to update displayable jobs
        setDisplayableJobs(jobPostings)
    }, [jobPostings])

    function onJobSelect(idx) {
        setSelectedJob(jobPostings[idx])
    }

    function onPageSelect(event, pageNum) {
        setPageNumber(pageNum)
    }

    return (
        <div>
            <div className="titleBox">
                <span className="title">Resume Match</span>
            </div>
            <Upload setJobPostings={setJobPostings} />
            <Filter
                filterGrade={filterGrade}
                filterDistance={filterDistance}
                filterSalary={filterSalary}
                setFilterGrade={setFilterGrade}
                setFilterDistance={setFilterDistance}
                setFilterSalary={setFilterSalary}
                setDisplayableJobs={setDisplayableJobs}
                displayableJobs={displayableJobs}
                jobPostings={jobPostings}
            ></Filter>
            <div className="main">
                <div className="display-data">
                    <div className="display-postings-section">
                        <PostingsSection
                            onJobSelect={onJobSelect}
                            displayableJobs={displayableJobs}
                            pageNumber={pageNumber}
                            numJobsPerPage={numJobsPerPage}
                        />
                    </div>
                    <div className="display-job-section">
                        <DetailedPosting job={selectedJob} />
                    </div>
                </div>
                <Pagination
                    onChange={onPageSelect}
                    count={displayableJobs.length > 0 ? Math.ceil(displayableJobs.length / numJobsPerPage) : 1}
                    shape="rounded"
                />
            </div>
        </div>
    )
}

export default App
