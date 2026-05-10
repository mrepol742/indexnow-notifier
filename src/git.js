import { execSync } from "child_process";

/**
 * Retrieves the list of files changed in the last commit.
 *
 * @returns {string[]} An array of changed file paths.
 */
export function getChangedFiles() {
  const output = execSync("git diff --name-only HEAD~1 HEAD")
    .toString()
    .trim();

  return output ? output.split("\n") : [];
}
