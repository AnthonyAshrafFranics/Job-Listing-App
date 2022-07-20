import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { format } from 'date-fns';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, closeModal, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {closeModal ? (
        <IconButton
          aria-label="close"
          onClick={closeModal}
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
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export const ViewJobModal = ({ job, closeModal }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        // open={open}
        open={!!Object.keys(job).length}
        fullWidth

      >
        <BootstrapDialogTitle id="customized-dialog-title" closeModal={closeModal}>
          {job.title} @ {job.companyName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Posted On:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.postedOn && format(job.postedOn, "dd/MM/yyyy HH:MM")}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Job Type:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.type}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Job Location:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.location}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Job Description:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.description}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Company Name:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.companyName}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption'>
                Company Website:
              </Typography>
              <Typography variant='body2' ml={1}>
                {job.companyUrl}
              </Typography>
            </Box>
            <Box display={"flex"} m={2}>
              <Typography variant='caption' display={"flex"} alignItems={"center"} mr={1}>
                Skills:
              </Typography>
                {job.skills && job.skills.map(a=> <Typography className='skillChip' variant='body2' ml={1}>{a}</Typography>)}
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button LinkComponent={"a"} href={job.link} target="_blank" autoFocus style={{color: "black", border: "2px solid black", borderRadius: "30px"}} variant="outlined" >
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
