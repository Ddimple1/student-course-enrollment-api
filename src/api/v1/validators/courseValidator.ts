import Joi from "joi";
import { Course } from "../models/Course_model";

export const createCourseSchema = Joi.object<Course>({
  Course_Name: Joi.string().min(1).required(),
  Course_description: Joi.string().min(3).required(),
  Course_credit: Joi.number().integer().min(0).required(),
  Course_duration: Joi.number().integer().min(0).required(),
  Course_id: Joi.number().optional(),
});

export const updateCourseSchema = Joi.object<Partial<Course>>({
  Course_Name: Joi.string().min(1),
  Course_description: Joi.string().min(3),
  Course_credit: Joi.number().integer().min(0),
  Course_duration: Joi.number().integer().min(0),
});
