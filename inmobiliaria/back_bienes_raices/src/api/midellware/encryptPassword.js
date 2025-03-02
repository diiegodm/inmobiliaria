const bcrypt = require('bcryptjs');

const encryptPassword = async (req, res, next) => {
    if (req.body.password) {
        try {
            // Generate salt
            const salt = await bcrypt.genSalt(10);
            // Encrypt password using salt
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next(); 
        } catch (error) {
            res.status(500).json({ message: 'Error al encriptar la contraseña', error });
        }
    } else {
        next(); 
    }
};

module.exports = encryptPassword;
