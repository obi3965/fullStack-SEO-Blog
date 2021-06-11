const User = require('../models/user')


exports.read = async (req, res) => {
    try {
        req.profile.hashed_password = undefined;
       return res.json(req.profile);
    } catch (err) {
      res.status(500).json({
          err:'server error'
      })  
    }
    
};