import Joi from "joi";

// CREATE / UPDATE RECORD
export const recordSchema = Joi.object({
  amount: Joi.number().positive().required(),

  type: Joi.string().valid("income", "expense").required(),

  category: Joi.string().required(),

  date: Joi.date(),

  note: Joi.string().allow(""),
});