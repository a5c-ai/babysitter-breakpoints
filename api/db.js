"use strict";

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");

const DB_PATH =
  process.env.DB_PATH ||
  path.join(__dirname, "..", "data", "breakpoints.db");

function openDb() {
  return new sqlite3.Database(DB_PATH);
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function initDb(db) {
  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await run(db, "PRAGMA foreign_keys = ON;");
  const statements = schema
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length);
  for (const statement of statements) {
    await run(db, statement);
  }
}

module.exports = {
  DB_PATH,
  openDb,
  run,
  get,
  all,
  initDb,
};
