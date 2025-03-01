let audio = document.getElementById('audio');
let buttonReproducirPausar = document.getElementById('reproducir-pausar');
let barraVolumen = document.getElementById('barra-volumen');
let barraProgreso = document.getElementById('barra-progreso');
let listaAudios = document.getElementById('lista-audios');

let estaPausado = true;


//Muestra la lista de audios
mostrarLista();

barraProgreso.addEventListener('click', function() {

    //Comprobar si hay un audio cargado
    if (audio.src === '') {
        return;
    }
    moverBarraProgreso(); 
}
);

barraVolumen.addEventListener('click', function() {
    moverBarraVolumen(); 
});


function mostrarLista() {

    //solictar los audios y mostrarlos en la lista
    solicitarAudios().then(data => {
        data.forEach(audioFile => {
            let item = document.createElement('li');
            item.textContent = audioFile.filePath;
            listaAudios.appendChild(item);

            //Cargar el audio seleccionado al hacer clic en el item
            item.addEventListener('click', () => {
                cargarAudioSeleccionado(audioFile, data);
            });
        });
    }).catch(error => {
        console.log('Error:', error);
    });
}

function alternarAudio() {

    
    // Si no hay audio seleccionado, mostrar un mensaje de alerta, altrernar entre reproducir y pausar
    if (audio.src === '') {
        alert('No se ha seleccionado un audio');
        return;
    }
    estaPausado ? reproducirAudio() : pausarAudio();
}

function reproducirAudio() {
    
    // Reproducir el audio y cambiear el booleano
    buttonReproducirPausar.innerText = 'Pausar';
    audio.play();
    estaPausado = false;
}

function pausarAudio() {

    // Pausar el audio y cambiar el booleano
    buttonReproducirPausar.innerText = 'Reproducir';
    audio.pause();
    estaPausado = true;
}

function siguienteAudio() {

    // Si no hay audio seleccionado, no hacer nada
    if (audio.src === '') {
        return
    }

    // Obtener el indice del audio actual
    indiceAudioActual = audio.textContent;
    
    // Obtener la lista de audios
    lista = Array.from(listaAudios.children);

    // El siguiente audio es el primero si el actual es el último
    siguienteIndice = (parseInt(indiceAudioActual) + 1) % lista.length;
    if (siguienteIndice === 0) siguienteIndice = lista.length;

    // Solicitar el audio por id y cargarlo
    solicitarAudioporId(siguienteIndice).then(data => {
        cargarAudioSeleccionado(data);
        reproducirAudio();
    }).catch(error => {
        console.log('Error:', error);
    }); 

}

function calcularPosicionBarra(rect) { 

    //Al dar clic en la barra de progreso o volumen, calcular la posición del clic
    const clickPosition = event.clientX - rect.left; // Posición del clic dentro de la barra
    const newValue = (clickPosition / rect.width) * barraVolumen.max; // Calcular el nuevo valor basado en la posición
    return newValue;
} 

function moverBarraProgreso() {

    //Mover la barra de progreso
    const rect = barraProgreso.getBoundingClientRect();
    newValue = calcularPosicionBarra(rect);

    //Actualizar la barra de progreso
    barraProgreso.value = newValue; 
    audio.currentTime = audio.duration * (newValue / 100); // Cambiar la posición del audio

}

function moverBarraVolumen() { 

    //Mover la barra de volumen
    const rect = barraVolumen.getBoundingClientRect();
    newValue = calcularPosicionBarra(rect);

    //Actualizar la barra de volumen
    barraVolumen.value = newValue; 
    cambiarVolumen(newValue / 100); // Cambiar el volumen del audio

}

function cambiarVolumen(valor) {
    audio.volume = valor;
}

