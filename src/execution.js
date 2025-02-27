const { unixToZeus } = require('./conversion');

/**
 * Executes a function when the system time reaches a specific ZEUS hash.
 * @param {number} epochTime - UNIX timestamp in seconds.
 * @param {Function} callback - Function to execute.
 */
async function executeAtZeusEpoch(epochTime, callback) {
  const hash = await unixToZeus(epochTime);
  console.log(`Waiting for ZEUS epoch: ${hash}`);

  const interval = setInterval(async () => {
    const currentHash = await unixToZeus(Math.floor(Date.now() / 1000));
    if (currentHash === hash) {
      clearInterval(interval);
      console.log("Executing action at ZEUS Epoch!");
      callback();
    }
  }, 1000);
}

module.exports = { executeAtZeusEpoch };
