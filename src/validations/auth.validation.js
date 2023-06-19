const Joi = require('joi');

const authValidation = (data)=>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    const {error} = schema.validate(data);
    if(error) return res.status(501).json({error : error.message});
}

module.exports = authValidation;