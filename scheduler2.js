// job to check the status of invoices and archive the paid records

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const invoice = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log(`running archive invoices task: ${new Date()}`);
  try {
    const paidInvoices = invoice.filter((item) => {
      return item.status === "paid";
    });
    if (paidInvoices.length > 0) {
      paidInvoices.forEach((item) => {
        invoice.splice(
          invoice.findIndex((e) => e.status === item.status),
          1
        );
      });

      console.log("the invoices are:", invoice);
      fs.writeFileSync(
        path.join(__dirname, "./", "data", "invoice.json"),
        JSON.stringify(invoice, null, 2),
        "utf-8"
      );

      console.log("the paid invoices are:", paidInvoices);
      fs.writeFileSync(
        path.join(__dirname, "./", "data", "archive.json"),
        JSON.stringify(paidInvoices, null, 2),
        "utf-8"
      );
    }
  } catch (error) {
    console.log(`err ${error}`);
  }
  console.log("archive invoices task ended");
};

cron.schedule("*/30 * * * * *", archiveInvoicesTask);
