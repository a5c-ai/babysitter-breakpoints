"use strict";

const { spawn } = require("child_process");
const path = require("path");

const repoRoot = path.join(__dirname, "..");

function run(label, command, args) {
  const proc = spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: true,
    cwd: repoRoot,
  });
  proc.on("exit", (code) => {
    if (code) {
      // eslint-disable-next-line no-console
      console.error(`${label} exited with code ${code}`);
      process.exitCode = code;
    }
  });
  return proc;
}

run("api", "node", [path.join(repoRoot, "api", "server.js")]);
run("worker", "node", [path.join(repoRoot, "worker", "worker.js")]);
