const noble = require('@abandonware/noble');
const TEN_SECONDS = 10000;
let keepAlive = 0 
let count = 0;

function startScanning() {
  return new Promise((resolve, reject) => {
    noble.startScanning();
    noble.on('discover', peripheral => {
      noble.stopScanning();
      resolve(peripheral);
    });

    setTimeout(() => {
      noble.stopScanning();
      reject('Timeout: No device found within the time limit.');
    }, TEN_SECONDS);
  });
}


async function scanWithDelay() {
  try {
    while (count < 10) {
        keepAlive++ 

      console.log('Scanning...');
      const peripheral = await startScanning();
      count++;
      console.log(`${keepAlive} Found device #${count}:`, peripheral.advertisement.localName, 'RSSI:', peripheral.rssi);

      if (count < 10) {
        console.log('Waiting 3 seconds before next scan...');
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay before the next scan
      }
    }
    console.log('Stopped scanning after discovering 10 devices.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn' && keepAlive < 10 ) {
    await scanWithDelay();
  } else {
    noble.stopScanning();
    console.log('Exiting');
    process.exit(0)
  }
});