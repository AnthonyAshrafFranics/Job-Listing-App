import { Box, Select, MenuItem, Button, Grid, CircularProgress } from '@mui/material'
import React, { useState } from 'react'

export const SearchBar = ({fetchJobsCustom}) => {
    const [loading, setLoading] = useState(false)
    const [jobSearch, setJobSearch] = useState({
        type: "Full time",
        location: "Remote",
    })
    const handleChange = (e) => {
        setJobSearch(oldState => ({...oldState, [e.target.name]: e.target.value}));
    }

    const search = async () => {
        setLoading(true);
        await fetchJobsCustom(jobSearch);
        setLoading(false);
    }

    return (
        <Box py={2} mt={-5} sx={{backgroundColor: "#fff", display: "flex", boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)", borderRadius: "5px", "&> *":{
            flex : 1,
            height: "45px",
            margin: "8px"
        } }}>
            <Select onChange={handleChange} value={jobSearch.type} name="type" disableUnderline variant='filled'  >
                <MenuItem value="Full time">Full Time</MenuItem>
                <MenuItem value="Part time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
            </Select>
            <Select onChange={handleChange} name="location" value={jobSearch.location} disableUnderline variant='filled'   >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-office">In-office</MenuItem>
            </Select>
            <Button onClick={search} disabled={loading} variant='contained' disableElevation style={{ backgroundColor: "#18E1D9", color: "black", fontWeight: "bold" }}>{loading ? <CircularProgress/> : "Search"}</Button>
        </Box>
    )
}
