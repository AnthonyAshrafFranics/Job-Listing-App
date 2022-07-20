import { Box, CircularProgress, Grid, Button } from '@mui/material';
import { useState,useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { JobCard } from './components/JobCard';
import { SearchBar } from './components/SearchBar';
import { db } from './firebase/config';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Close } from '@mui/icons-material';
import { ViewJobModal } from './components/ViewJobModal';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});



  const fetchJobs = async () => {
    setCustomSearch(false)
    setLoading(true);
    const collectionRef = collection(db, "jobs");
    const q = query(collectionRef, orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const arr = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return {...doc.data(), id: doc.id, postedOn: doc.data().postedOn.toDate()}
    });
    setJobs(arr);
    // console.log(jobs);
    setLoading(false);
  }

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true)
    const collectionRef = collection(db, "jobs");
    const q = query(collectionRef, where("location", "==", jobSearch.location), where("type", "==", jobSearch.type) , orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const arr = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return {...doc.data(), id: doc.id, postedOn: doc.data().postedOn.toDate()}
    });
    console.log(arr);
    setJobs(arr);
    // console.log(jobs);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, [])
  return (
    <div className="">
      <div >
        <Header />
        <ViewJobModal job={viewJob} closeModal={()=> setViewJob({})} />
      </div>
      <div>
        <Grid container justifyContent={"center"} >
          <Grid item xs={10} >
            <SearchBar fetchJobsCustom={fetchJobsCustom} />
            
              {loading ? (
              <Box display={"flex"} justifyContent="center" mt={5}> <CircularProgress/> </Box>
              ) : (
              <>
              {customSearch &&
              (<Box  my={2} display={"flex"} justifyContent={'flex-end'}>
                <Button onClick={fetchJobs} style={{color: "black"}}>
                  <Close size={20}/>
                  Custom Search
                </Button>
              </Box>
              )}
              {jobs.map((a) => (<JobCard open={() => setViewJob(a)} key={a.id} {...a} />)
            )}
              </>
              )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
