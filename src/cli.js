#!/usr/bin/env node

import { getChangedFiles } from "./git.js";
import { mapNextJsAppRouter, mapNextJsPagesRouter } from "./mappers/nextjs.js";
import { notifyIndexNow } from "./indexnow.js";

/**
 * Parses command-line arguments and returns the value for a given argument name.
 *
 * @param {string} name - The name of the argument to retrieve (without the '--' prefix).
 * @returns {string|null} The value of the argument if found, or null if not found.
 */
function getArg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 ? process.argv[index + 1] : null;
}

const site = getArg("site");
const host = getArg("host");
const key = getArg("key");
const framework = getArg("framework") || "nextjs-app";

if (!site || !host || !key) {
  console.error(`
Usage:
  indexnow --site <url> --host <host> --key <key> --framework <framework>

Example:
  indexnow \\
    --site https://www.melvinjonesrepol.com \\
    --host melvinjonesrepol.com \\
    --key your-key
    --framework nextjs-app
  `);

  process.exit(1);
}

/**
 * Main function to run the IndexNow notifier.
 * It retrieves changed files, maps them to URLs based on the specified framework,
 * and sends the URLs to the IndexNow API.
 */
async function run() {
  const changed = getChangedFiles();

  let urls = [];

  if (framework === "nextjs-app") {
    urls = mapNextJsAppRouter(changed, site);
  } else if (framework === "nextjs-pages") {
    urls = mapNextJsPagesRouter(changed, site);
  }

  await notifyIndexNow({
    host,
    key,
    urls,
  });
}

run();
