/**
 * Notifies the IndexNow API about changed URLs.
 *
 * @param {Object} params - The parameters for the notification.
 * @param {string} params.host - The host domain.
 * @param {string} params.key - The API key.
 * @param {string[]} params.urls - The list of URLs to notify.
 * @returns {Promise<void>} A promise that resolves when the notification is complete.
 */
export async function notifyIndexNow({ host, key, urls }) {
  if (!urls.length) return;

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host,
      key,
      urlList: urls,
    }),
  });

  if (!res.ok) {
    throw new Error(`IndexNow failed: ${res.status}`);
  }

  console.log(`Submitted ${urls.length} URLs`);
}
