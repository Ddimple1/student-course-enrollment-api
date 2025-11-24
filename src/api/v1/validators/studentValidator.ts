// src/api/v1/validators/studentValidator.ts
import Joi from "joi";
import { Student } from "../models/Student_model";

export const createStudentSchema = Joi.object<Student>({
  FullName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  program: Joi.string().allow("", null).optional(),
  enrollment_year: Joi.number().integer().min(2000).max(2100).optional(),
});

export const updateStudentSchema = Joi.object<Partial<Student>>({
  FullName: Joi.string().min(1),
  email: Joi.string().email(),
  program: Joi.string().allow("", null),
  enrollment_year: Joi.number().integer().min(1900).max(2100),
});
