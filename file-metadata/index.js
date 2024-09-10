import express from 'express';
import multer from 'multer';
import cors from "cors"

const app = express();
app.use(cors())

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res
    .status(200)
    .json({ name: file.originalname, type: file.mimetype, size: file.size });
});

app.listen(5000, () => console.log('Server is running on port 5000'));
