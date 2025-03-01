// Incluir dependencias del servicio.
import express, { json } from 'express';
import cors from 'cors';

// Inicializar el servidor.
const app = express();
app.use(cors());
app.use(json());

// Definir el puerto de escucha.
const port = process.env.PORT || 3000;


const audios = [

  {
    id: 1,
    fileName: 'audio1.mp3',
    filePath: '/audio/Minecraft Steve OOF Sound Effect.mp3' 
  },
  { 
    id: 2,
    fileName: 'audio2.mp3', 
    filePath: '/audio/C418 - Minecraft - Minecraft Volume Alpha.mp3' 
  },
  { id: 3, 
    fileName: 'audio3.mp3', 
    filePath: '/audio/Terraria Music - Mushrooms.mp3' 
  }

];

app.get('/audio', (req, res) => {
  res.json(audios);
});

app.get('/audio/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const audio = audios.find(audio => audio.id === id);
  if (audio) {
    res.json(audio);
  } else {
    res.status(404).json({ message: 'Audio not found' });
  }
});

// Iniciar el servidor.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});