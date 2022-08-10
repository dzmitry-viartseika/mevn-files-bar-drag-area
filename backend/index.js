import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';


dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {console.log('DB is OK')})
    .catch((err) => {console.log('err', err)})

const app = express();
app.use(cors());
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// FILES
app.post('/single-upload', upload.single('file'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post('/multiple-upload', upload.array('files', 10), (req, res) => {
    console.log(req.files);
    // const result = req.files.map((file) => `/uploads/${file.originalname}`);
    // console.log('result', result);
    // res.json({
    //     files: req.files,
    // });
});

app.listen(process.env.PORT || 4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})