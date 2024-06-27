import { Schema, model } from 'mongoose';

const COLLECTION_NAME = "admin";
const DOCUMENT_NAME = "Admin";

// Declare the Schema of the Mongo model
const adminSchema = new Schema({
    lastName: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Admin'
    },
    isEnable: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, // tự động tạo createdAt và updatedAt
    collection: COLLECTION_NAME,
});

adminSchema.pre('save', function (next) {
    // Kiểm tra nếu không có trường role được truyền vào
    if (!this.role) {
        // Gán giá trị mặc định là 'Admin' cho trường role
        this.role = 'Admin';
    }
    next();
});

export default model(DOCUMENT_NAME, adminSchema);
