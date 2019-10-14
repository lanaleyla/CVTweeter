const Joi = require('joi');

export const userSchema = Joi.object().keys({
    id: Joi.string().min(24).max(24),
    userName: Joi.string().alphanum().min(1),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

export const tweetSchema = Joi.object().keys({
    id: Joi.string().min(24).max(24),
    userName: Joi.string().alphanum().min(1),
    content: Joi.string().min(1).max(240),
    numberOfStars:Joi.number().min(0),
})

export const credentialSchema = Joi.object().keys({
    id: Joi.string().min(24).max(24),
    userName: Joi.string().alphanum().min(1),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
})
