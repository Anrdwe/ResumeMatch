import React from "react"
import "./filter-component.css"

import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Slider,
    Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
    salarySlider: {
        width: 200,
        marginTop: theme.spacing(3),
    },
}))

const marks = [
    {
        value: 0,
        label: "0k",
    },
    {
        value: 50,
        label: "50k",
    },
    {
        value: 100,
        label: "100k",
    },
]

function valuetext(value) {
    return `${value}k`
}

function Filter({
    filterGrade,
    filterDistance,
    filterSalary,
    setFilterGrade,
    setFilterDistance,
    setFilterSalary,
    setDisplayableJobs,
    displayableJobs,
    jobPostings,
}) {
    const classes = useStyles()

    const handleGradeChange = (event) => {
        setFilterGrade(event.target.value)
        let currentJobs
        if (displayableJobs.length > 0) {
            currentJobs = displayableJobs
        } else {
            currentJobs = jobPostings
        }
        setDisplayableJobs(
            currentJobs.filter((job) => job.grade >= event.target.value)
        )
    }

    const handleDistanceChange = (event) => {
        setFilterDistance(event.target.value)
    }

    const handleSalaryChange = (event, newSalary) => {
        setFilterSalary(newSalary)
        let currentJobs
        if (displayableJobs.length > 0) {
            currentJobs = displayableJobs
        } else {
            currentJobs = jobPostings
        }
        setDisplayableJobs(currentJobs.filter((job) => job.salary >= newSalary))
    }

    return (
        <div className="parserBox">
            <div className="sortingBox">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterGrade}
                        onChange={handleGradeChange}
                    >
                        <MenuItem value={60}>60%+</MenuItem>
                        <MenuItem value={70}>70%+</MenuItem>
                        <MenuItem value={80}>80%+</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                        Distance
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterDistance}
                        onChange={handleDistanceChange}
                    >
                        <MenuItem value={5}>within 5 km</MenuItem>
                        <MenuItem value={10}>within 10 km</MenuItem>
                        <MenuItem value={15}>within 15 km</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.salarySlider}>
                    <Typography id="discrete-slider-always" gutterBottom>
                        Salary
                    </Typography>
                    <Slider
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        step={10}
                        marks={marks}
                        valueLabelDisplay="on"
                        value={filterSalary}
                        onChange={handleSalaryChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filter
