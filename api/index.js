// API
const express = require('express');
const redis = require("redis");

const {promisify} = require('util');    
client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const app = express();
const port = 3001;

// fetch data from redis and return it to frontend
app.get('/v1/api/jobs', async (req, res) => {
  const jobs = await getAsync('github');
  console.log(JSON.parse(jobs).length);  
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  return res.send(jobs)
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

