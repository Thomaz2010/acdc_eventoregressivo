AOS.init();

const dataEvento = new Date("Dec 12, 2024 , 19:00:00");
const timeStampDoEvento = dataEvento.getTime();

const contaHoras = setInterval(function() {
    const agora = new Date();
    const timeStampAtual = agora.getTime();

    const diaEmMs = 1000 * 60 * 60 * 24;
    const horasEmMs = 1000 * 60 * 60; 
    const minutoEmMs = 1000 * 60; 

    const distanciaAteEvento = timeStampDoEvento - timeStampAtual;
    const diasAteEvento = Math.floor(distanciaAteEvento / diaEmMs);
    const horasEvento = Math.floor((distanciaAteEvento % diaEmMs) / horasEmMs);
    const minutosEvento = Math.floor((distanciaAteEvento % horasEmMs) / minutoEmMs);
    const segundosEvento = Math.floor((distanciaAteEvento % minutoEmMs) / 1000);

    document.getElementById('contador').innerHTML = `${diasAteEvento}Dias - ${horasEvento}h ${minutosEvento}m ${segundosEvento}s`;

    if (distanciaAteEvento < 0){
        clearInterval(contaHoras);
        document.getElementById('contador').innerHTML = 'Evento Expirado';
    }
}, 1000);

document.getElementById('gpsButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('Usuário negou a solicitação de geolocalização.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Informações de localização não estão disponíveis.');
            break;
        case error.TIMEOUT:
            alert('A solicitação para obter a localização do usuário expirou.');
            break;
        case error.UNKNOWN_ERROR:
            alert('Ocorreu um erro desconhecido.');
            break;
    }
}

