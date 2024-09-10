import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
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
