import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        filePath: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('FileModel', FileSchema);