import FileModel from '../models/file-model.js';

export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(500).send({
            success: false,
            message: 'You have to select at least 1 file',
        });
    }

    try {
        const file = new FileModel({
            fileName: req.file.filename,
            filePath: `/uploads/${req.file.originalname}`,
        })

        await file.save();

        res.json({
            fileName: file.fileName,
            filePath: file.filePath,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось загрузить файл',
        })
    }
}

export const uploadFiles = async (req, res) => {
    if (!req.files.length) {
        return res.status(500).send({
            success: false,
            message: 'You have to select at least 1 file',
        });
    }

    if (req.files.length > 2) {
        return res.status(500).send({
            success: false,
            message: 'You have to select maximum 2 files',
        });
    }

    Promise.all(
        req.files.map(async (file) => {
            const newFile = new FileModel({
                fileName: req.file.filename,
                filePath: `/uploads/${req.file.originalname}`,
            });

            return await newFile.save();
        })
    )
        .then(res.status(201).json("files successfully uploaded"))
        .catch((e) => {
            res
                .status(500)
                .json({ message: "Something went wrong in /uploads/img", error: e });
        });

    // const files = req.files.map(async (file) => {
    //     const fileItem = new FileModel({
    //         fileName: file.filename,
    //         filePath: `/uploads/${file.originalname}`,
    //     })
    //
    //     await fileItem.save();
    // });
    //
    // console.log('files', files);
    //
    // return await res.json({
    //     files,
    // });
}

