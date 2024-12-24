// simple job

const cron = require("node-cron");

const task = () => {
  console.log(`running a scheduled task at: ${new Date()}`);
};

// note that we need spaces between them so that it can understand if it's min,week,...
cron.schedule("* * * * *", task);
