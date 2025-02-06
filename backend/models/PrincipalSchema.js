import mongoose, { Schema } from "mongoose";

// File Schema
const FileSchema = new Schema({
  typeSchool:{
    type: String,
    required: true,
  },
  
  grade: {
    type: String,
     required: true,
  },
  subject: {
    type: String,
     required: true,
  },

  quarter: {
    type: String,
    required: true,
  },

  week: {
    type: String,
    required: true,
  },

  files: [{
    description: {
      type: String,
      required: true,
    },  

    filename: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: null,
      enum: ['pdf', 'docx', 'doc', 'ppt', 'pptx', 'xls', 'xlsx', 'image', 'video'],
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

// Teacher Schema
const TeacherSchema = new Schema({
  role: { type: String, required: true },
  school: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" }, // New field
}, {
  timestamps: true,
});

// Principal Schema
const PrincipalSchema = new Schema({
  role: { type: String, required: true },
  school: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
}, {
  timestamps: true,
});

// Models
export const Files = mongoose.model('File', FileSchema);
export const Teacher = mongoose.model('Teacher', TeacherSchema);
export const PrincipalItems = mongoose.model('Principal', PrincipalSchema);
