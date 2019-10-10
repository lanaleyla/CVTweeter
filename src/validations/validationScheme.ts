
const Joi = require('joi');
export const userSchema = Joi.object().keys({
    id: Joi.string().min(36).max(36),
    userName: Joi.string().alphanum().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
})

export const tweetSchema = Joi.object().keys({
    id: Joi.string().min(36).max(36),
    userName: Joi.string().alphanum().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
})

