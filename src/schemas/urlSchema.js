import Joi from "joi";

const urlSchema = Joi.string().uri().required();

export default urlSchema;
