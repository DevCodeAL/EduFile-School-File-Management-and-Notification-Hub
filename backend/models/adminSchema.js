import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, requred: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

const AdminUser = mongoose.model('admin', adminSchema);

export default AdminUser;