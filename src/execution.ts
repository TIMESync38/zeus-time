import { unixToZeus } from './conversion';

/**
 * Executes a function when the system time reaches a specific ZEUS hash.
 * @param epochTime UNIX timestamp in seconds.
 * @param callback Function to execute.
 */
export async function executeAtZeusEpoch(epochTime: number, callback: () => void) {
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
