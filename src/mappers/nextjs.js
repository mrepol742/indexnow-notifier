/**
 * Maps Next.js app router files to their corresponding routes.
 *
 * @param {string[]} files - An array of file paths to map.
 * @param {string} baseUrl - The base URL of the site to prepend to the routes.
 * @returns {string[]} An array of full URLs corresponding to the Next.js app router files.
 */
export function mapNextJsAppRouter(files, baseUrl) {
  return files
    .filter((f) => /app\/.*\/page\.(tsx|jsx|js|ts)$/.test(f))
    .filter((f) => !/\/api\//.test(f))
    .map((f) => {
      let route = f
        .replace(/^src\/app/, "")
        .replace(/^app/, "")
        .replace(/\/page\.(tsx|jsx|js|ts)$/, "");

      return `${baseUrl}${route || "/"}`;
    });
}

/**
 * Maps Next.js pages router files to their corresponding routes.
 *
 * @param {string[]} files - An array of file paths to map.
 * @param {string} baseUrl - The base URL of the site to prepend to the routes.
 * @returns {string[]} An array of full URLs corresponding to the Next.js pages router files.
 */
export function mapNextJsPagesRouter(files, baseUrl) {
  return files
    .filter((f) => /pages\/.*\.(tsx|jsx|js|ts)$/.test(f))
    .filter((f) => !/pages\/_/.test(f))
    .filter((f) => !/pages\/api\//.test(f))
    .map((f) => {
      let route = f
        .replace(/^src\/pages/, "")
        .replace(/^pages/, "")
        .replace(/\.(tsx|jsx|js|ts)$/, "")
        .replace(/\/index$/, "");

      return `${baseUrl}${route || "/"}`;
    });
}
