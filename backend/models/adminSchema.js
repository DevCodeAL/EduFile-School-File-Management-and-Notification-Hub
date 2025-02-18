import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, requred: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
      school: { type: String, required: true },
      fullname: { type: String, required: true },
      contact: { type: String, default: null },
      // Profile
      filename: {
        type: String,
        default: null,
      },
      fileType: {
        type: String,
        default: null,
        enum: ['image'],
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
}, {
  timestamps: true,
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

const NewsFileSchema = new Schema({
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

const EventsFileSchema = new Schema({
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
export const NewsFilesSchema = mongoose.model('NewsFiles', NewsFileSchema);
export const EventsFilesSchema = mongoose.model('EventsFiles', EventsFileSchema);
