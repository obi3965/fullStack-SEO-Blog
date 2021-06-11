const User = require('../models/user')
const shortId = require('shortid');
const Jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
require('dotenv').config()




exports.register = async (req,res) => {
  const { name, email, password } = req.body
  let username = shortId.generate()
  let profile = `${process.env.CLIENT_URL}/profile/${username}`
  try {
     const user = new User({
         name,
         email,
         password,
         username,
         profile

     }) 
      const userExist = await User.findOne({email:email})
      
      
      if(userExist){
          return res.status(400).json({
              message:'user already signed up'
          })
      }
     const users = await user.save()
     res.status(200).json({
       message:"you are signed up, please login",
       users
       
     })

  } catch (err) {
      res.status(500).json({
          error:'server error',
          error: err
      } )
         
        
      
  }  
}

exports.login = async (req,res) => {
  const { email, password } = req.body
  try {
      const user = await User.findOne({email:email})
      //  user.role = undefined
       if(user){
         if(user.authenticate(password)){
          const token = Jwt.sign({ _id: user._id }, process.env.JWT_TOKEN,{expiresIn:process.env.JWT_EXPIRES_IN});
          res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN });
          const {_id,username,name,email, role } = user;
           res.json({ 
             
             token, 
             user: { _id,username,name, email, role} });
          } 
          
       }
      
       else{
          return res.status(401).json({
            error: 'email and password is not exist,please register'
           })
         }
      } catch (err) {
       res.status(500).json({
         error:err
       })
      }
}


exports.logout = async (req,res) => {
   res.clearCookie('token')
   res.json({
    message:' logout success'
   })
}


exports.hello = async(req,res) => {
  res.json({
    user:req.user
  })
}

