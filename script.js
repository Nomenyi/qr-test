// import QrScanner from "./node_modules/qr-scanner/qr-scanner.min.js";


// const camQrResult = document.getElementById('cam-qr-result');
const flashToggle = document.getElementById('flash-toggle');
const flashState = document.getElementById('flash-state');
const video = document.getElementById('qr-video');
const scanRegion = document.getElementById('show-scan-region');
const highlightScanRegion = document.getElementById('scan-region-highlight-style-select');
const camQrResult = document.getElementById('identifiant');

function getResult(label, result) {
    let qrData = result.data; // Use it as you need

    label.value = qrData; // here we fill form input with this data
    
    // Don't forget do stop and destroy scanner if operations are finished
    scanner.stop();
    scanner.destroy();
    scanner = null;

    $('#scannerModal').modal('hide') // hide modal after getting data
}

// const updateFlashAvailability = () => {
//     scanner.hasFlash().then(hasFlash => {
//         // camHasFlash.textContent = hasFlash;
//         flashToggle.style.display = hasFlash ? 'inline-block !important' : 'none';
//     });
// };

$('#start-button').on('click',  () => {
    const scanner = new QrScanner(video, result => getResult(camQrResult, result), {
        highlightScanRegion: true,
        highlightCodeOutline: true,
    });

    scanner.hasCamera().then(
        scanner.start().then(() => {
            scanner.hasFlash().then(hasFlash => {
                flashToggle.style.display = hasFlash ? 'inline-block !important' : 'none';
            });
        })
    );
})

highlightScanRegion.addEventListener('change', (e) => {
    videoContainer.className = e.target.value;
    scanner._updateOverlay(); // reposition the highlight because style 2 sets position: relative
});

scanRegion.addEventListener('change', (e) => {
    const input = e.target;
    const label = input.parentNode;
    label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
    scanner.$canvas.style.display = input.checked ? 'block' : 'none';
});

flashToggle.addEventListener('click', () => {
    scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
});

$('#stop-button').on('click', () => {
    scanner.stop();
    scanner.destroy();
    scanner = null;
});