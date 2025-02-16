import express from 'express';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import AdminUser, { AnnouncementFiles, EventsFilesSchema, NewsFilesSchema } from '../models/adminSchema.js';
import authMiddleware from '../middleware/authMiddleWare.js';
import  { Files, NewAnnouncement, NewSchedule, PrincipalItems, Teacher } from '../models/PrincipalSchema.js';
import upload from '../middleware/uploadMiddleware.js';
import { io } from '../server.js';
import { sendEmailToTeachers } from '../controllers/emailService.js';
import { sendApprovalEmail } from '../controllers/sendEmailAproval.js';
import { sendPrincipalsNotificationsEmail } from '../controllers/principalEmailServices.js';
import uploadProfile from '../middleware/profileUpload.js';
import uploadAnnouncementFile from '../middleware/announcementMiddleware.js';
import uploadNewsFile from '../middleware/newMiddleWare.js';
import uploadEventFile from '../middleware/eventMiddleWare.js';
const router = express.Router();

// Registration for Principal
router.post('/principal', async (req, res)=> {
    const { role, school, fullname, email, password } = req.body;
    try {
        if(!role || !school || !fullname || !email || !password){
            return res.status(400).json({message: 'All Required Faileds!'});
        };

        const findEmail = await PrincipalItems.findOne({email});

        if (findEmail) {
          return res.status(500).json({ message: 'Email already exists!' });
        }

        const hashPassword = await bycrypt.hash(password, 10);

        const createNewItems = new PrincipalItems({
              role,
              school,
              fullname,
              email,
              password: hashPassword,
        });
            await createNewItems.save();

            const principalEmail = await PrincipalItems.find({role: 'principal'}).select('email');
            const getEmail = principalEmail.map(t => t.email);

            await sendPrincipalsNotificationsEmail(getEmail);

            // Emit real-time notification to all connected teachers
            io.emit("principalAccount", { message: `Your principal account is created .` });

            res.status(200).json({
                message: 'Created Successfully',
                data: {
                    role: role,
                    school: school,
                    fullname: fullname,
                    email: email,
                    password: password,
                }
            });

            } catch (error) {
                res.status(500).json({message: 'No user registerd', error});
            }
});

//  Profile Update
router.put('/userprofile/:userId', uploadProfile.single('picture'), async(req, res)=>{
    const { fullname, email, contact, role } = req.body;
   const { userId } = req.params;
   console.log('Incoming parameter', req.params);
    try {
        
         const { originalname, mimetype, size, path } = req.file;

         const getFileType = (mimetype)=>{
            if(mimetype.startsWith("image")) return "image";
            if(mimetype === null) return "unknown";
          };

         const fileType = getFileType(mimetype);
          if(fileType === "unknown"){
             return res.status(401).json({message: "Unsupported File!"});
          };


        //   Check the role for updating
        let userItem;
        switch(role){
           case 'principal':
            userItem = await PrincipalItems.findById(userId);
           break;

           case 'teacher': 
            userItem = await Teacher.findById(userId);
           break;

           default:
                console.log(`Sorry, we are out of ${role}.`);
        }
        
          if(!userItem){
            return res.status(400).json({message: 'No userId exist'});
          };

          
           // Update fields only if they are provided
        if (fullname) userItem.fullname = fullname;
        if (email) userItem.email = email;
        if (contact) userItem.contact = contact;

        const fileData = {originalname, mimetype, size, metadata: { path }};

        // Update file details if a file was uploaded
        if (req.file) {
            userItem.originalname = fileData.originalname;
            userItem.mimetype = fileData.mimetype;
            userItem.size = fileData.size;
            userItem.metadata = fileData.metadata;
        }

          await userItem.save();

          res.status(200).json({Message: "Successfully Updated"});
        
        } catch (error) {
            res.status(500).json({error: error.message});
        }
});


// Route to associate teachers with their principal by school---------
router.post('/associate', async (req, res) => {
    try {
        const principals = await PrincipalItems.find();

        for (const principal of principals) {
            const teachers = await Teacher.find({ school: principal.school });
            principal.teachers = teachers.map(teacher => teacher._id);
            await principal.save();
        }

        res.status(200).json({ message: 'Teachers associated with principals successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to get all principals with their associated teachers---------
router.get('/all-principals', async (req, res) => {
    try {
        const principals = await PrincipalItems.find().populate('teachers');
        res.status(200).json(principals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Registration for Teacher
router.post('/register', async (req, res)=>{
        const { role, school, fullname, email, password } = req.body;
        console.log('Incoming data: ', req.body);
    try{

        if(!role || !school || !fullname || !email || !password){
            return res.status(200).json({message: 'All required fields!'});
        };

        const hashPassword = await bycrypt.hash(password, 10);

        const newUserItems = new Teacher({ 
            role: role,
            school: school,
            fullname: fullname,
            email: email,
            password: hashPassword,
            status: "pending",
            });

        await newUserItems.save();

        res.status(200).json({
            success: true,
            message: 'Registerd Successfully, but pending approval!',
             newUserItems});

    
    }catch(error){
        res.status(500).json({message: 'No user registerd', error});
    }
});


// Approve for Teachers
router.put("/approve/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        teacher.status = "approved"; // Change status to approved
        await teacher.save();

        // Get all teachers' emails
        const teachers = await Teacher.find({ role: "teacher" }).select("email");
        const teacherEmails = teachers.map((t) => t.email); 

        // Send email notifications to all teachers
        await sendApprovalEmail(teacherEmails);

        // Emit real-time notification to all connected teachers
        io.emit("teacherApproved", { message: `Teacher ${teacher.fullname} has been approved.` });

        res.status(200).json({ message: "Teacher approved successfully" });
    } catch (error) {
        console.error("Error approving teacher:", error);
        res.status(500).json({ error: "Error approving teacher" });
    }
});


//   Get Pending teachers
  router.get("/pending-teachers/:principalUserId", async (req, res) => {
    const { principalUserId } = req.params;
    try {
      const principal = await PrincipalItems.findById(principalUserId).populate("teachers");

        if(!principal){
            return res.status(400).json({message: 'No pending user!'});
        }

        const pendingTeachers = principal.teachers.filter(teacher => teacher.status === 'pending');

      res.status(200).json(pendingTeachers);
    } catch (error) {
      res.status(500).json({ error: "Error fetching pending teachers" });
    }
  });


// Reject teacher registration
router.delete('/reject/:id', async (req, res) => {
    try {

      await Teacher.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Item deleted' });

    } catch (err) {

      res.status(500).json({ message: err.message });
    }
  });
  

// Route to get all teachers-----------
router.get('/all-teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all teachers under a specific principal
router.get("/specificteachers/:id", async (req, res) => {
    const { id } = req.params;
    try {

      // Fetch principal and populate teachers
      const principal = await PrincipalItems.findById(id).populate("teachers");

      if (!principal) {
        return res.status(404).json({ message: "Principal not found" });
      }

    const ApprovedTeachers = principal.teachers.filter(teacher => teacher.status === 'approved');
      
  
      res.json(ApprovedTeachers);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

  // Specific teachers for deletion
  router.delete('/deleteSpecificTeachers/:teachersById', async (req, res)=>{
    const { teachersById } = req.params;
    
    try {

      const findByTeacher = await Teacher.findOneAndDelete(teachersById);

      if(!findByTeacher){
        return res.status(400).json({message: 'No teachers user id exist!'});
      };

      res.status(200).json({success: findByTeacher.teachers});
      
    } catch (error) {
      console.error('Failed to delete teachers', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  


// Login for Administrator
router.post('/admin', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        };
        

        // Find the admin user by username
        const userAdmin = await AdminUser.findOne({ username });
        if (!userAdmin) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const isMatch = bycrypt.compare(password, userAdmin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        // Generate a JWT token
        const JwtToken = jwt.sign(
            {
                id: userAdmin._id,
                username: userAdmin.username,
                email: userAdmin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN } // Ensure this is defined in your .env file
        );

        // Send success response with token and user info
        res.status(200).json({
            message: 'Successfully logged in',
            token: JwtToken,
            user: {
                id: userAdmin._id,
                username: userAdmin.username,
                email: userAdmin.email,
            },
        });
    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Profile for Admin
router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const userId = req.userId; // Retrieve userId from decoded token (set in the middleware)
      const userItem = await AdminUser.findById(userId);
      if (!userItem) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User profile retrieved successfully',
        data: userItem,
      });
    } catch (error) {
      console.error('Error retrieving user profile:', error.message);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  });

// Login Users
router.post('/user', async (req, res) => {
    const { role, email, password } = req.body;
    try {
        // Check for missing fields
        if (!role || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const useritem = await Teacher.findOne({ email });

        if(role === 'teacher'){
              // Check if teacher is approved
            if (useritem.status !== "approved") {
                return res.status(403).json({ error: "Your account is pending approval" });
            }
        };
   
        let user;
        switch (role) {
            case 'principal':
                user = await PrincipalItems.findOne({ email, role });
                break;
            case 'teacher':
                user = await Teacher.findOne({ email, role });
                
                break;
            default:
                return res.status(400).json({ message: 'Invalid role!' });
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bycrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Default expiration to 1 hour if unset
        );

        // Respond with success
        res.status(200).json({
            message: 'User logged in successfully!',
            token: jwtToken,
            data: {
                role: user.role,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

    //Get Principal or Teachers Profile
    router.get('/user-profile', authMiddleware, async (req, res) => {
        const { role } = req; // Extract userId and role from the request object
        try {
            const userId = req.userId; // Retrieve userId from the decoded token (set in the middleware)
            let userItem;

            // Handle profile retrieval based on role
            switch (role) {
                case 'principal':
                    userItem = await PrincipalItems.findById(userId);
                    break;
                case 'teacher':
                    userItem = await Teacher.findById(userId);
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid or missing role!' });
            }
    
            // Check if user exists
            if (!userItem) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Respond with user profile
            res.status(200).json({
                message: 'User profile retrieved successfully',
                data: userItem,
            });
        } catch (error) {
            console.error('Error retrieving user profile:', error.message);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    });    


    // Upload files , Pdf, Docx, Doc Image, Videos
router.post("/stats", upload.single("file"), async (req, res) => {
    const {  description, grade, subject, quarter, week } = req.body;
    try {
        
      let fileData = null;
      if (req.file) {
        const { originalname, mimetype, size, path } = req.file;
  
        // Determine file type
        const fileType = getFileType(mimetype);
        if (fileType === "unknown") {
          return res.status(400).json({ message: "Unsupported file type" });
        }
  
        fileData = {
        description,
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      }
  
      // Create and save file document
      const newItem = new Files({
       grade,
       subject,
       quarter,
       week,
        files: fileData,
      });
  
      await newItem.save();

          // Get all teachers' emails
          const teachers = await Teacher.find({ role: "teacher" }).select("email");
          const teacherEmails = teachers.map((teacher) => teacher.email);
      
          // Send email notifications to all teachers
          await sendEmailToTeachers(teacherEmails, newItem);
      
          // Emit real-time notification to all connected teachers
          io.emit("newFileUploaded", { message: `New file uploaded: ${newItem.description}` });
   
      res.status(201).json({ message: "File uploaded and notifications sent!", newItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  });
  
  // Helper function to determine file type
function getFileType(mimetype) {
    if (mimetype.startsWith("image")) return "image";
    if (mimetype.startsWith("video")) return "video";
    if (mimetype === "application/pdf") return "pdf";
    if (mimetype === "application/vnd.ms-powerpoint") return "ppt"; // For .ppt files
    if (mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation")
      return "pptx"; // For .pptx files
    if (mimetype === "application/msword") return "doc"; // For .doc files
    if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      return "docx"; // For .docx files
    if (mimetype === "application/vnd.ms-excel") return "xls"; // For .xls (older Excel format)
    if (mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      return "xlsx"; // For .xlsx (modern Excel format)
    return "unknown";
  };

  
// Admin Upload Announcement Files
router.post('/announcement-files', 
  uploadAnnouncementFile.array('files', 10), async (req, res) => {
    const { title, date, message } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      // Function to determine file type
      function getFileType(mimetype) {
        if (mimetype.startsWith('image')) return 'image';
        if (mimetype.startsWith('video')) return 'video';
        return 'unknown';
      }

      // Map through files and create file data
      const filesData = req.files.map(file => {
        const { originalname, mimetype, size, path } = file;

        const fileType = getFileType(mimetype);
        if (fileType === 'unknown') {
          throw new Error(`Unsupported file type: ${originalname}`);
        }

        return {
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      });

      // Create a new Announcement with files data
      const newItem = new AnnouncementFiles({
        title,
        date,
        message,
        files: filesData, // Multiple files
      });

      await newItem.save();

      res.status(200).json({ message: 'Announcement file(s) uploaded successfully', newItem });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create announcement files', error: error.message });
    }
  });

// Get All Announcement Files
router.get('/get-anouncement-files', async (req, res)=>{
  try {
    const getItem = await AnnouncementFiles.find();

     if(!getItem){
        res.status(400).json({message: 'No announcement file exist!'});
     };

     res.status(200).json({success: 'Succefully fetch anouncement files!', data: getItem});
  } catch (error) {
    console.error('Failed to fetch!', error);
  res.status(500).json({message: 'Failed to fetch anouncement files!', error: error.message});
  }
});

// News Upload Files
router.post('/newsItem-files', 
  uploadNewsFile.array('files', 10), async (req, res) => {
    const { title, date, message } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      // Function to determine file type
      function getFileType(mimetype) {
        if (mimetype.startsWith('image')) return 'image';
        if (mimetype.startsWith('video')) return 'video';
        return 'unknown';
      }

      // Map through files and create file data
      const filesData = req.files.map(file => {
        const { originalname, mimetype, size, path } = file;

        const fileType = getFileType(mimetype);
        if (fileType === 'unknown') {
          throw new Error(`Unsupported file type: ${originalname}`);
        }

        return {
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      });

      // Create a new Announcement with files data
      const newItem = new NewsFilesSchema({
        title,
        date,
        message,
        files: filesData, // Multiple files
      });

      await newItem.save();

      res.status(200).json({ message: 'Announcement file(s) uploaded successfully', newItem });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create announcement files', error: error.message });
    }
  });

  // Get All News Files
router.get('/get-news-files', async (req, res)=>{
  try {
    const getItem = await NewsFilesSchema.find();

     if(!getItem){
        res.status(400).json({message: 'No announcement file exist!'});
     };

     res.status(200).json({success: 'Succefully fetch anouncement files!', data: getItem});
  } catch (error) {
    console.error('Failed to fetch!', error);
  res.status(500).json({message: 'Failed to fetch anouncement files!', error: error.message});
  }
});


// Event Upload Files
router.post('/eventsItem-files', 
 uploadEventFile.array('files', 10), async (req, res) => {
    const { title, date, message } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      // Function to determine file type
      function getFileType(mimetype) {
        if (mimetype.startsWith('image')) return 'image';
        if (mimetype.startsWith('video')) return 'video';
        return 'unknown';
      }

      // Map through files and create file data
      const filesData = req.files.map(file => {
        const { originalname, mimetype, size, path } = file;

        const fileType = getFileType(mimetype);
        if (fileType === 'unknown') {
          throw new Error(`Unsupported file type: ${originalname}`);
        }

        return {
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      });

      // Create a new Announcement with files data
      const newItem = new EventsFilesSchema({
        title,
        date,
        message,
        files: filesData, // Multiple files
      });

      await newItem.save();

      res.status(200).json({ message: 'Announcement file(s) uploaded successfully', newItem });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create announcement files', error: error.message });
    }
  });

    // Get All Events Files
router.get('/get-events-files', async (req, res)=>{
  try {
    const getItem = await EventsFilesSchema.find();

     if(!getItem){
        res.status(400).json({message: 'No announcement file exist!'});
     };

     res.status(200).json({success: 'Succefully fetch anouncement files!', data: getItem});
  } catch (error) {
    console.error('Failed to fetch!', error);
  res.status(500).json({message: 'Failed to fetch anouncement files!', error: error.message});
  }
});




//   File Updates
router.put('/statsUpdates/:id', upload.single("file"), async(req, res)=>{
    const { id } = req.params;
    const {  description, grade, subject, quarter, week } = req.body;
    try {
        const { updateData } = req.body;
        let fileData = null;
      if (req.file) {
        const { originalname, mimetype, size, path } = req.file;
  
        // Determine file type
        const fileType = getFileType(mimetype);
        if (fileType === "unknown") {
          return res.status(400).json({ message: "Unsupported file type" });
        }
  
        fileData = {
        description,
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      }; 

      const newItems = await Files.findByIdAndUpdate(id, updateData);
  
    //   // Create and save file document
    //   const newItem = new Files({
    //    grade,
    //    subject,
    //    quarter,
    //    week,
    //     files: fileData,
    //   });
  
    //   await newItem.save();

          // Get all teachers' emails
        //   const teachers = await Teacher.find({ role: "teacher" }).select("email");
        //   const teacherEmails = teachers.map((teacher) => teacher.email);
      
          // Send email notifications to all teachers
        //   await sendEmailToTeachers(teacherEmails, newItem);
      
          // Emit real-time notification to all connected teachers
        //   io.emit("newFileUploaded", { message: `New file uploaded: ${newItem.description}` });
   
      res.status(201).json({ message: "File uploaded and notifications sent!", newItems });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file", error: error.message });
    }
});


  

  // Endpoint to list files with unique identifiers
router.get('/file', async (req, res) => {
    try {
        const files = await Files.find();
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching items from DB:', error);
        res.status(500).json({ message: "Error fetching files", error: error.message });
    }
});

// Create Schedule
router.post('/schedule/:userId', async (req, res)=>{
    const { title, date, time, description } = req.body;
    const { userId } = req.params;
    try {

        if(!title || !date || !time || !description){
            return res.status(400).json({message: 'All required fields!'});
        };

        if(!userId){
            return res.status(401).json({message: 'Required userId'});
        };

        const principal = await PrincipalItems.findById(userId);

        if(!principal){
            return res.status(402).json({message: 'No user found in principal!'});
        };

        const createNewSchedule  = new NewSchedule({
            title,
            date,
            time,
            description,
    });

         await createNewSchedule.save();

        principal.schedule.push(createNewSchedule._id);
        await principal.save();

        res.status(201).json({ message: "Successfully created schedule", schedule: createNewSchedule });

    } catch (error) {
        res.status(500).json({message: 'Error creating schedule', error: error.message})
        console.error('No schedule created', error);
    }
});

// Get all teachers under a specific principal
router.get("/specificSchedule/:id", async (req, res) => {
    const { id } = req.params;
    try {

      // Fetch principal and populate teachers
      const principal = await PrincipalItems.findById(id).populate("schedule");
  
      if (!principal) {
        return res.status(404).json({ message: "Principal not found" });
      };
  
      res.json(principal.schedule);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

// Get schedules for a teacher based on their principal
router.get("/schedulesByPrincipal/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the principal who manages this teacher
    const principal = await PrincipalItems.findOne({ teachers: id }).populate("schedule");

    if (!principal) {
      return res.status(404).json({ message: "Principal not found for this teacher" });
    }

    if (!principal.schedule || principal.schedule.length === 0) {
      return res.status(404).json({ message: "No schedules found for this teacher's principal" });
    }

    res.status(200).json(principal.schedule);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

//  create announcement
router.post('/announcement/:userId', async (req, res)=>{
    const { title, date, time, message } = req.body;
    const { userId } = req.params;
    try {
        if(!title || !date || !time || !message){
            return res.status(400).json({message: 'Required all fields!'});
        };

        const principal = await PrincipalItems.findById(userId);
        
        if(!principal){
            return res.status(403).json({message: 'No principal found'});
        };
        
         const newAnnouncement = new NewAnnouncement({
             title, date, time, message,
         });
         await newAnnouncement.save();

         principal.announcement.push(newAnnouncement._id);
         await principal.save();

         res.status(200).json({message: 'Successfully created new announcemnet!', announcement: newAnnouncement})

    } catch (error) {
        console.error({message: 'Failed to create announcement!', error: error.message});
        throw error;
    }
});

// Get All Specific Announcment for principal
router.get('/specificAnnouncement/:userid', async (req, res)=>{
    const { userid } = req.params;
    try {
          // Fetch principal and populate teachers
      const principal = await PrincipalItems.findById(userid).populate("announcement");
  
      if (!principal) {
        return res.status(404).json({ message: "Principal not found" });
      };
  
      res.json(principal.announcement);
    } catch (error) {
        console.error({message: 'Failed to fetch announcement!', error: error.message});
        throw error;
    }
});

// Get All Specific Announcement for Teachers
router.get('/announcementByPrincipal/:teachersID', async (req, res)=>{
  const { teachersID } = req.params;
    try{

      const findByTeacherId = await PrincipalItems.findOne({teachers: teachersID}).populate('announcement');

      if(!findByTeacherId){
        return res.status(400).json({message: 'No teachers Id found exist!'});
      };

      res.status(200).json(findByTeacherId.announcement);

    }catch(error){
      console.error({message: 'Failed to fetch announcement!', error: error.message});
        throw error;
    }
});

// Update Schedule
router.put('/scheduleUpdate/:id', async (req, res)=>{
    const { id } = req.params;
    try {
        const updatedData = req.body;
    
        // Find and update the schedule
        const updatedSchedule = await NewSchedule.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true, 
        });
    
        if (!updatedSchedule) {
          return res.status(404).json({ message: "Schedule not found" });
        }
    
        res.status(200).json(updatedSchedule);

      

    } catch (error) {
         console.error({message: 'Failed to update schedule!', error: error.message});
        throw error;
    }
});

router.delete('/scheduleDelete/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const deleteData = req.body;
        const deleteSchedule = await NewSchedule.findByIdAndDelete(id, deleteData);
        if(!deleteSchedule){
            return res.status(400).json({message: 'No deleted data!'});
        };

    }catch(error){
        console.error({message: 'Failed to delete schedule!', error: error.message});
        throw error;
    }
});

// Update Announcement
router.put('/announcementUpdate/:id', async (req, res)=>{
    const { id } = req.params;
    try {
        const updatedData = req.body;
    
        // Find and update the schedule
        const updatedAnnouncement = await NewAnnouncement.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true, 
        });
    
        if (!updatedAnnouncement) {
          return res.status(404).json({ message: "Schedule not found" });
        }
    
        res.status(200).json(updatedAnnouncement);

      

    } catch (error) {
         console.error({message: 'Failed to update schedule!', error: error.message});
        throw error;
    }
});

router.delete('/announcementDelete/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const deleteData = req.body;
        const deleteSchedule = await NewAnnouncement.findByIdAndDelete(id, deleteData);
        if(!deleteSchedule){
            return res.status(400).json({message: 'No deleted data!'});
        };

    }catch(error){
        console.error({message: 'Failed to delete schedule!', error: error.message});
        throw error;
    }
});

// Forgot Password for Principal and Admin
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
console.log('Incoming body:', req.body);
  try {
    const user = await PrincipalItems.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Generate Reset Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Store Token in Database
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 15 * 60 * 1000; // Expires in 15 min
    await user.save();

    // Send Email with Reset Link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent to your email!" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "Both fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bycrypt.hash(password, 10);

    await PrincipalItems.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ message: "Password has been reset successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token!" });
  }
});



// Forgot Password for Admin
router.post("/forgot-password-admin", async (req, res) => {
  const { email } = req.body;
console.log('Incoming body:', req.body);
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Generate Reset Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Store Token in Database
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 15 * 60 * 1000; // Expires in 15 min
    await user.save();

    // Send Email with Reset Link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="http://localhost:5173/reset-password-admin/${token}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent to your email!" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

// Reset Password
router.post("/reset-password-admin/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "Both fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bycrypt.hash(password, 10);

    await AdminUser.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ message: "Password has been reset successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token!" });
  }
});


export default router;