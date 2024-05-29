const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');

const isAdmin = async (req, res, next) => {
    console.log('inside isadmin ');
    try {
        const user = await Users.findById(req.userId); // Fetch the user from the database using userId from req object
        console.log(user);
        // If the user does not exist or is not an admin, return an error
        if (!user || !user.isAdmin) {
            return res.status(403).json("Unauthorized - Admin access required");
        }

        next();
    } catch (err) {
        res.status(500).json("An error occurred");
        console.log(err);
    }
}

module.exports = isAdmin;