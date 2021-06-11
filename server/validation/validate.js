const { check, validationResult } = require('express-validator')


exports.signupValidate = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a Valid email'),
    check('password').isLength({min:6}).withMessage('password Must be at least 6 charactors long')
]

exports.signinValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];


exports.runValidation = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({error: errors.array()[0].msg})
    }
    next()
}
 

