// Worker

var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');

// fetch githug jobs
new CronJob('0 * * * *', fetchGithub, null, true, 'America/Los_Angeles');

