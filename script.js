// import QrScanner from "./node_modules/qr-scanner/qr-scanner.min.js";

const video = document.getElementById('qr-video');

const qrScanner = new QrScanner(
    video,
    result => alert('decoded qr code:', result),
    { 
        /* your options or returnDetailedScanResult: true if you're not specifying any other options */ 
        highlightScanRegion: true,
    },
);

qrScanner.start()

// document.getElementById('start-button').addEventListener('click', () => {
//     alert('scan will start')
//     qrScanner.start()
// });

