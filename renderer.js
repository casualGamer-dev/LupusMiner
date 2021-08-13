// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const shelljs = require('shelljs');
const axios = require('axios');
const fs = require('fs');
const util = require("util");
const exec = util.promisify(require('shelljs').exec);
const prompt = require("prompt-sync")({sigint: true});
const BTCaddress = '3GsPEXpQEt12N2zhEp3x4R9Miw6PHPM8J9'
const chalk = require("chalk");
const figlet = require("figlet");
const sysinfo = require("systeminformation")
const timings = args.includes("-v") || args.includes("--timings");
/**
 * Download a file from online.
 * @param url The URL to download from
 * @param filename The name of the file
 * */
 async function download(url, filename) {
    let stream = fs.createWriteStream(filename)
    let res = await axios({
        url: url,
        method: "GET",
        responseType: "stream"
    })
    res.data.pipe(stream)
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve)
        stream.on('error', reject)
    })
}
    