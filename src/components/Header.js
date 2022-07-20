import { Box, Typography, Grid, FilledInput, Select, MenuItem, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { async } from '@firebase/util';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { set } from 'date-fns';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
export const Header = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState({
        title: "",
        type: "Full time",
        companyName: "",
        companyUrl: "",
        location: "Remote",
        link: "",
        skills: [],
        description: ""
    })

    const addRemoveSkill = skill => {
        jobDetails.skills.includes(skill) ? setJobDetails(oldState => ({ ...oldState, skills: oldState.skills.filter((s) => s != skill) })) : setJobDetails(oldState => ({ ...oldState, skills: oldState.skills.concat(skill) }))
        console.log(jobDetails)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setJobDetails({
            title: "",
            type: "Full time",
            companyName: "",
            companyUrl: "",
            location: "Remote",
            link: "",
            skills: [],
            description: ""
        })
    };
    const handleChange = (e) => {
        e.preventDefault();
        setJobDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value }))
    }
    const skills = ["Javascript", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL"];

    const postJob = async () => {
        for(const fields in jobDetails){
            if(typeof jobDetails[fields] === "string" && !jobDetails[fields]) return;
        }
        if(!jobDetails.skills.length) return
        setLoading(true)
        let obj = jobDetails
        obj.postedOn = Timestamp.fromDate(new Date())
        // setJobDetails(oldState =>  ({...oldState, postedOn: Timestamp.fromDate(new Date())}));
        const newCityRef = doc(collection(db, "jobs"));
        console.log(obj)
        await setDoc(newCityRef, obj);
        setJobDetails({
            title: "",
            type: "Full time",
            companyName: "",
            companyUrl: "",
            location: "Remote",
            link: "",
            skills: [],
            description: ""
        })
        setLoading(false)
        handleClose();
    }


    return (
        <Box py={10} className='bg-dark text.light'>
            <Grid container className='d-flex justify-content-center flex-row py-3'>
                <Grid item xs={10}>
                    <Box display={"flex"} justifyContent="space-between">
                        <Typography variant='h4' color={"white"} >Open Job Listing</Typography>
                        <Button variant='contained' disableElevation style={{ backgroundColor: "#18E1D9", color: "black" }} onClick={handleClickOpen}>Post a Job</Button>
                    </Box>
                </Grid>
            </Grid>
            <div>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Post Job
                    </BootstrapDialogTitle>
                    <DialogContent dividers className='p-4'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FilledInput onChange={handleChange} autoComplete='off' name="title" value={jobDetails.title} placeholder='Job Title *' disableUnderline fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <Select disableUnderline onChange={handleChange} variant='filled' name="type" value={jobDetails.type} fullWidth>
                                    <MenuItem value="Full time">Full Time</MenuItem>
                                    <MenuItem value="Part time">Part Time</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <FilledInput autoComplete='off' onChange={handleChange} name="companyName" value={jobDetails.companyName} placeholder='Company name *' disableUnderline fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledInput autoComplete='off' onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} placeholder='Company URL *' disableUnderline fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <Select disableUnderline variant='filled' onChange={handleChange} name="location" value={jobDetails.location} fullWidth >
                                    <MenuItem value="Remote">Remote</MenuItem>
                                    <MenuItem value="In-office">In-office</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <FilledInput autoComplete='off' onChange={handleChange} name="link" value={jobDetails.link} placeholder='Job link *' disableUnderline fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <FilledInput autoComplete='off' onChange={handleChange} name="description" value={jobDetails.description} placeholder='Job Description *' disableUnderline fullWidth multiline rows={4} />
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Typography>Skills *</Typography>
                            <Box className='fw-bold' display={"flex"}>
                                {skills.map((a) => <Box key={a} onClick={() => addRemoveSkill(a)} style={{ color: "black", margin: "4px", padding: "5px", borderRadius: "5px", cursor: "pointer", border: "2px solid black", transition: "0.3s" }} className={`modalChips ${jobDetails.skills.includes(a) && "included"}`}>{a}</Box>)}
                            </Box>
                        </Box>
                        <DialogActions className='mt-4'>
                            <Box width={"100%"} display="flex" justifyContent={"space-between"} alignItems={"baseline"}>
                                <Typography variant='caption' color={"red"}>*Required fields</Typography>
                                <Button variant='contained' disableElevation style={{ backgroundColor: "#18E1D9" }} 
                                onClick={postJob} disabled={loading}>{loading ? <CircularProgress/> : "Post Job"}</Button>
                            </Box>
                        </DialogActions>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </Box>
    )
}
