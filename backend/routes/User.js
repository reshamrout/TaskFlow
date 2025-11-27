const express = require("express");
const router = express.Router();
const {auth, isAdmin} = require('../middleware/auth')

const {
    signup,
    login
} = require("../controllers/auth");

const {
    getAllUsers,
} = require('../controllers/User');

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", auth, isAdmin, getAllUsers);

module.exports = router;