import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
    role: { type: String, required: true },
    school: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});


const PrincipalSchema = new Schema({
    role: { type: String, required: true },
    school: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }], // Reference teachers by their IDs

    // Files
    files: {
        filename: {
          type: String,
          default: null,
        },
        fileType: {
          type: String,
          default: null,
          enum: ['pdf', 'docx', 'doc','ppt', 'pptx', 'image', 'video'],
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
          type: mongoose.Schema.Types.Mixed, // Additional info if needed
          default: {},
        },
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    });
    
    export const PrincipalItems = mongoose.model('Principal', PrincipalSchema);
    export const Teacher = mongoose.model('Teacher', TeacherSchema);
    
    export default { PrincipalItems, Teacher };
    
    
