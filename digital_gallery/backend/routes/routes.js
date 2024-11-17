const {userLogin} = require("../controllers/user_control")
const {userSignup} = require("../controllers/user_control")

const {uploadImagesFromCSV} = require('../controllers/image_control');



const express = require("express")

const router = express.Router();

const user = require("../controllers/user_control");

const {images} = require("../controllers/image_control");


router.post("/user/signup",userSignup);
router.post("/user/login",userLogin);
router.post("/user/image",uploadImagesFromCSV );


module.exports = router;