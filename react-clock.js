#! /bin/env node
const { spawn } = require("child_process");
const path = require("path");

const serveScript = spawn("serve", ["-s", `${path.join(__dirname, "build")}`, "-l", "8111"]);
console.log(__dirname);

serveScript.stdout.on("data", (stream) => {
  console.log(`${stream}`);
});

const browser = spawn("xdg-open", ["http://localhost:8111"]);

serveScript.on("error", (error) => {
  console.log(error);
});

serveScript.on("exit", () => {
  browser.kill();
});
