
const router = require("express").Router();
const path = require("path");
const fs = require('fs');
const baseDir = process.cwd();
const multer = require('multer');

const { Image, ContentImage } = require('../models');

// Multer image filter, checks if the uploaded file is an image
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images.', false);
    }
};

// Multer configuration for single file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        console.log(`the user id i can attach is here: ${req.session.user_id}`)
        cb(null, `${req.session.user_id}`);
    },
});

// Multer function that receives a single file and uploads it to the specified destination
const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

// Uploads a new image to the database for the user's profile picture
const uploadProfilePic = async (req, res) => {
    try {

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        // Create a new image in the database
        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __dirname + '/resources/static/assets/uploads/' + req.file.filename
            ),
            user_id: req.session.user_id,
        }).then((image) => {
            fs.writeFileSync(
                baseDir + '/public/images/tmp/' + req.session.user_id + '.jpg',
                image.data
            );

            return res.sendFile(path.join(`${__dirname}/../public/html/crud.html`));
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}

// Uploads a new image to the database for the specified content
const uploadContentImage = async (req, res) => {
    try {

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        ContentImage.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __dirname + '/resources/static/assets/uploads/' + req.file.filename
            ),
            content_id: req.body.content_id,
            
        }).then((image) => {
            fs.writeFileSync(
                baseDir + '/public/images/contentImages/' + req.body.content_id + '.jpg',
                image.data
            );

            return res.sendFile(path.join(`${__dirname}/../public/html/blog.html`));
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}

// Gets the html page for uploading a new profile picture
router.get("/upload", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../views/images.html`))
});

// Gets the user's profile picture based on their id
router.get('/profilePic', async (req, res) =>{
    try {
        const imageData = await Image.findOne({where: {user_id: req.session.user_id}})
        if (!imageData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.setHeader('Content-Type', imageData.type);
        res.status(404).send(imageData.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Gets the content image based on the content id
router.post("/upload", uploadFile.single("file"), uploadProfilePic);

// Uploads a new image for the specified content
router.post("/uploadContentImage", uploadFile.single("file"), (req,res) => {
    req.body.content_id = req.body.content_id || req.query.content_id;
    uploadContentImage(req, res);
});
    



module.exports = router;