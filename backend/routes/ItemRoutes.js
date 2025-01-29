import express from 'express';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
 import AdminUser from '../models/adminSchema.js';
import authMiddleware from '../middleware/authMiddleWare.js';
import  { Files, PrincipalItems, Teacher } from '../models/PrincipalSchema.js';
import upload from '../middleware/uploadMiddleware.js';


// Registration for Principal
router.post('/principal', async (req, res)=> {
    const { role, school, fullname, email, password } = req.body;
    console.log('Incoming data:', req.body);
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
        console.log('Incoming data:' , req.body);
    try{

        if(!role || !school || !fullname || !email || !password){
            return res.status(200).json({message: 'All required fields!'});
        }

        const hashPassword = await bycrypt.hash(password, 10);

        const newUserItems = new Teacher({ 
            role: role,
            school: school,
            fullname: fullname,
            email: email,
            password: hashPassword,
            });

        await newUserItems.save();

        res.status(200).json({message: 'Registerd Successfully', newUserItems});

    
    }catch(error){
        res.status(500).json({message: 'No user registerd', error});
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

// Login for Administrator
router.post('/admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Find the admin user by username
        const userAdmin = await AdminUser.findOne({ username });
        if (!userAdmin) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        if (userAdmin.password !== password) {
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
    console.log('Incoming body: ', req.body);

    try {
        // Check for missing fields
        if (!role || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

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
    const {  description, uploadedBy, grade, subject, quarter, } = req.body;
    console.log('Incoming data', req.body);
    console.log("File Data:", req.file);

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
          filename: originalname,
          fileType,
          mimetype,
          size,
          metadata: { path }, // Save path for internal reference
        };
      }
  
      // Create and save file document
      const newItem = new Files({
        description,
       uploadedBy,
       grade,
       subject,
       quarter,
        files: fileData,
      });
  
      await newItem.save();
   
      res.status(201).json({ message: "File uploaded successfully", newItem });
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
    return "unknown";
  };

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
  

export default router;