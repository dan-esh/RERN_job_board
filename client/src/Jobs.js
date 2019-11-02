import React from "react";
import { Typography } from "@material-ui/core";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Job from "./Job";
import JobModal from './JobModal';

export default function Jobs({ joblist }) {
  // this component will hold "view" state
  
  // modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});
  const handleClickOpen = () => {
      setOpen(true);
    };
  const handleClose = () => {
      setOpen(false);
    };
  

  const [activeStep, setActiveStep] = React.useState(0);
  
  //pagination where steps == page
  const numJobs = joblist.length;
  const JOBS_ON_PAGE = 20
  const numPages = Math.ceil(numJobs / JOBS_ON_PAGE);
  const listOfLobs = joblist.slice(activeStep * JOBS_ON_PAGE,(activeStep * JOBS_ON_PAGE) + JOBS_ON_PAGE);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  //console.log('job is ', joblist[0]);

  return (
    <div className={'Jobs'}>
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <Typography variant="h4" component="h1">Entry Level Software Jobs</Typography>
      <Typography variant="h6" component="h2">Found {numJobs} Jobs</Typography>
      {listOfLobs.map(
        (job, i) => ( <Job 
          key={i} 
          job={job} 
          onClick={() => {
            //console.log('clicked');
            handleClickOpen();
            selectJob(job)
          }
          }
          />
      ))}
      <div>
        Page {activeStep +1} of {numPages}
      </div>
      {/* Clientside Pagination from https://material-ui.com/components/steppers/ */}
      <MobileStepper
      variant="progress"
      steps={numPages}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === numPages}>
          Next
          {<KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {<KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
    {/* Comment */}
    </div>
  );
}
