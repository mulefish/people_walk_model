const noble = require('@abandonware/noble');

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});
let count = 0
noble.on('discover', peripheral => {
    count++;
    console.log(`${count}   RSSI ${peripheral.rssi} from device ${peripheral.advertisement.localName}`);
    if (count >= 10) {
      noble.stopScanning();
      console.log('Stopped scanning after 10 measurments.');
      process.exit(0)
    }
});
