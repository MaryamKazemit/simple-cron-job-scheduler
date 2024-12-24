// job data housekeeping older than 180 days

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const archive = require("./data/archive.json");

const houseKeepingTask = () => {
  console.log(`running house keeping task: ${new Date()}`);
  try {
    archive.map((item, index) => {
      const presentDate = new Date().getTime();
      const recordDate = new Date(item.date).getTime();
      //   console.log(
      //     `the number of days: ${Math.floor(
      //       (presentDate - recordDate) / (1000 * 60 * 60 * 24)
      //     )}`
      //   );
      if (
        Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24)) > 180
      ) {
        archive.splice(index, 1);
        fs.writeFileSync(
          path.join(__dirname, "./", "data", "archive.json"),
          JSON.stringify(archive, null, 2),
          "utf-8"
        );
      }
    });
  } catch (error) {
    console.log(`err ${error}`);
  }
  console.log("house keeping task ended");
};

cron.schedule("* * * * *", houseKeepingTask);
