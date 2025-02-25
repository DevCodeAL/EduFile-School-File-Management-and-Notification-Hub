import mongoose, { Schema } from "mongoose";

// File Schema
const FileSchema = new Schema({
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
  contact: { type: String, default: null},
  password: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" }, // New field
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

// Schedule
const Schedule = new Schema({
  title: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  description: { type: String, required: true }
}, {
  timestamps: true,
});

// Announcement
const Announcement = new Schema({
  title: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  message: { type: String, required: true }
}, {
  timestamps: true,
});

// Principal Schema
const PrincipalSchema = new Schema({
  role: { type: String, required: true },
  school: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, default: null },
  password: { type: String, required: true },
  
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
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
  announcement:  [{ type: Schema.Types.ObjectId, ref: 'Announcement' }],
}, {
  timestamps: true,
});

// Teachers Tranfers to Schema
const TransferToSchema = new Schema({
  fromPrincipal: { type: Schema.Types.ObjectId, ref: 'Principal', required: true },
  toPrincipal: { type: Schema.Types.ObjectId, ref: 'Principal', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, 
  createdAt: { type: Date, default: Date.now },
});


// Models
export const Files = mongoose.model('File', FileSchema);
export const Teacher = mongoose.model('Teacher', TeacherSchema);
export const PrincipalItems = mongoose.model('Principal', PrincipalSchema);
export const NewSchedule = mongoose.model('Schedule', Schedule);
export const NewAnnouncement = mongoose.model('Announcement', Announcement);
export const TransferRequest = mongoose.model('TransferRequest', TransferToSchema);
