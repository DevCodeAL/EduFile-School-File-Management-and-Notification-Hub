import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, requred: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

const announcementSchema = new Schema({
    title: {
        type: String,
         required: true,
      },
      
      date: {
        type: String,
        required: true,
      },
    
      message: {
        type: String,
        required: true,
      },
    
      files: [{
        filename: {
          type: String,
          default: null,
        },
        fileType: {
          type: String,
          default: null,
          enum: ['image', 'video'],
        },
        mimetype: {
          type: String,
          default: null,
        },
        size: {
          type: Number,
          default: null,
        },
        uploadDate: {
          type: Date,
          default: Date.now,
        },
        metadata: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
      }],
    }, {
      timestamps: true, // Adds createdAt and updatedAt fields
});

const AdminUser = mongoose.model('admin', adminSchema);
export default AdminUser;
export const AnnouncementFiles = mongoose.model('AnnouncementFiles', announcementSchema);
