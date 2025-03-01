const api = 'http://localhost:3000'

let tituloAudio = document.getElementById('nombre-audio');


async function solicitarAudios() {
    // Fetch de audios del servidor
    try {
        const response = await fetch(`${api}/audio`);
        if (!response.ok) throw new Error('Error al obtener los audios');
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }  
}

async function solicitarAudioporId(id) {
    // Fetch de audio por id del servidor
    try {
        const response = await fetch(`${api}/audio/${id}`);
        if (!response.ok) throw new Error('Error al obtener el audio');
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
}

function cargarAudioSeleccionado(audioFile) {
    
    // Cargar el audio seleccionado
    audio.src = audioFile.filePath;
    audio.textContent = audioFile.id;

    // Cambiar el titulo del audio y borrar los datos anteriores
    resetearDatos();
    audio.load();
    tituloAudio.innerText = audioFile.filePath;
}


