import express from 'express';
import multer from 'multer';
import path from 'path';

export const fileRoutes = express.Router();

const storageDir = path.join(__dirname, '../../', 'public/');

const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageDisk });

fileRoutes.get('/', (req, res) => {
    res.status(200).json({ 'greet': 'Hello' });
});

fileRoutes.post('/upload', upload.array('files'), (req, res, next) => {
    res.status(200).json({'file': req.files});
});

fileRoutes.get('/download/:name', (req, res, next) => {
    const fileName = req.params.name;
    const filePath = path.join(storageDir, fileName);

    return res.download(filePath, fileName, (error) => {
        if(error) {
            throw new Error(error.message);
        } else {
            return res.status(200).send('success');
        }
    });
});
