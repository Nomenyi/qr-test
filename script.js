// import QrScanner from "./node_modules/qr-scanner/qr-scanner.min.js";

// const camQrResult = document.getElementById('cam-qr-result');
const flashToggle = document.getElementById('flash-toggle');
const flashState = document.getElementById('flash-state');
const video = document.getElementById('qr-video');

function setResult(result) {
    alert(result)
}

const scanner = new QrScanner(video, result => setResult(result), {
    onDecodeError: error => {
        // camQrResult.textContent = error;
        // camQrResult.style.color = 'inherit';
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

const updateFlashAvailability = () => {
    scanner.hasFlash().then(hasFlash => {
        // camHasFlash.textContent = hasFlash;
        flashToggle.style.display = hasFlash ? 'inline-block' : 'none';
    });
};

// scanner.start().then(() => {
//     updateFlashAvailability();
// })

document.getElementById('start-button').addEventListener('click', () => {
    QrScanner.hasCamera().then(
        scanner.start().then(() => {
            updateFlashAvailability();
        })
    );
});

// $('#start-button').on('click',  () => {
//     QrScanner.hasCamera().then(
//         scanner.start().then(() => {
//             updateFlashAvailability();
//         })
//     );
// })

window.scanner = scanner;

// document.getElementById('scan-region-highlight-style-select').addEventListener('change', (e) => {
//     videoContainer.className = e.target.value;
//     scanner._updateOverlay(); // reposition the highlight because style 2 sets position: relative
// });

// document.getElementById('show-scan-region').addEventListener('change', (e) => {
//     const input = e.target;
//     const label = input.parentNode;
//     label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
//     scanner.$canvas.style.display = input.checked ? 'block' : 'none';
// });

flashToggle.addEventListener('click', () => {
    scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
});

document.getElementById('stop-button').addEventListener('click', () => {
    scanner.stop();
});