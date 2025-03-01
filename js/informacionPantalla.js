const tiempoTranscurrido = document.getElementById('tiempo-transcurrido');

audio.ontimeupdate = function() {
    
    //El tiempo y la barra de progreso se actualizan
    actualizarTiempoAudio();
    actualizarBarraProgreso();
};

audio.addEventListener('ended', function() {

    //El tiempo y la barra de progreso se reinician
    resetearDatos();
    
    alternarAudio();
    
});

function actualizarBarraProgreso() {

    //Calculamos el porcentaje de la barra de progreso
    let duracion = audio.duration;
    let tiempo = audio.currentTime;
    let porcentaje = (tiempo / duracion) * 100;
    barraProgreso.value = porcentaje;

}

function actualizarTiempoAudio() {

    //Aplicamos el formato de tiempo mm:ss, actualizamos el tiempo transcurrido y mostramos la duración total
    let currentTime = new Date(audio.currentTime * 1000).toISOString().substr(14, 5);
    let duration = new Date(audio.duration * 1000).toISOString().substr(14, 5);
    tiempoTranscurrido.textContent = currentTime + " / " + duration;

}

function resetearDatos() {

    //Reiniciamos la barra de progreso y el tiempo transcurrido
    barraProgreso.value = 0; 
    tiempoTranscurrido.textContent = "00:00 / 00:00"; 

}