const fetch = require('node-fetch');
const redis = require("redis");
const {promisify} = require('util');    
client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  
  let resultCount = 1, onPage = 0;
  const allJobs = [];

  // fetch all pages from baseURL
  while(resultCount > 0){
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('got ', resultCount, ' jobs for this page');
    onPage++;
  }
  // state after fetching jobs
  console.log('got ', allJobs.length, ' jobs in total');
  
  // filter algo
  const jnrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    // algo logic
    if(
      jobTitle.includes('senior') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('architect')
      ){
        return false;
      }
      return true;
  });

  console.log('filtered down to ', jnrJobs.length, ' jobs');
  
  // set into redis
  const success = await setAsync('github', JSON.stringify(jnrJobs));
  // state after set into redis
  console.log({success});

}




module.exports = fetchGithub;
