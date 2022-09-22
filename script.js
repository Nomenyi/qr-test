const flashToggle = document.getElementById('flash-toggle');
const flashState = document.getElementById('flash-state');
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('identifiant');

function getResult(label, result) {
    let qrData = result.data; // Use it as you need

    label.value = qrData; // here we fill form input with this data
    
    // Don't forget do stop scanner if operations are finished
    scanner.stop();

    $('#scannerModal').modal('hide') // hide modal after getting data
}


const scanner = new QrScanner(video, result => getResult(camQrResult, result), {
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

const checkFlash = () => {
    scanner.hasFlash().then(hasFlash => {
        flashToggle.style.display = hasFlash ? 'block !important' : 'none';
    });
};

$('#start-button').on('click',  () => {
    scanner.hasCamera().then(
        scanner.start().then(() => {
            checkFlash();
        })
    );
})

flashToggle.addEventListener('click', () => {
    scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
});

$('#stop-button').on('click', () => {
    scanner.stop();
});

$('#submit').on('click', (e) => {
    e.preventDefault();
    alert('I have finished mine! 😎')
});