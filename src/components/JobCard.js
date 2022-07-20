import { Box,Button,Grid,Typography } from '@mui/material'
import React from 'react';
import {differenceInMinutes} from "date-fns";






export const JobCard = ({title,companyName,skills,postedOn,type,location,open}) => {
  return (
    <Box p={2} className="mt-3 jobWrapper" style={{border: "1px solid #e8e8e8", }} >
        <Grid container alignItems={"center"}>
            <Grid item xs>
                <Typography variant='subtitle1'>{title}</Typography>
                <Typography variant='subtitle1' style={{fontSize: "13.5px", backgroundColor: "#18E1D9", padding: "6px", borderRadius: "5px", fontWeight: 600, display: "inline-block"}}>{companyName}</Typography>
            </Grid>
            <Grid item container  xs>
              {skills.map((a)=><Grid className='skillChip' key={a} item>
                {a}
              </Grid>)}
            </Grid>
            <Grid item xs className="d-flex flex-column" alignItems={"flex-end"}>
              <Typography variant='caption'>{differenceInMinutes(Date.now(),postedOn)} min ago | {type} | {location}</Typography>
              <Button onClick={open} className="rounded-pill mt-3 fw-bold" variant='outlined' style={{border: "2px solid black", color: "black"}} >Check</Button>
            </Grid>
        </Grid>
    </Box>
  )
}
