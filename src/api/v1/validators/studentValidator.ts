// src/api/v1/validators/studentValidator.ts
import Joi from "joi";
import { Student } from "../models/Student_model";

/**
 * @openapi
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - FullName
 *         - email
 *       properties:
 *         FullName:
 *           type: string
 *           minLength: 1
 *           description: Full name of the student
 *           example: "Dimple Dimple"
 *         email:
 *           type: string
 *           format: email
 *           description: Student's email address
 *           example: "dimple@example.com"
 *         program:
 *           type: string
 *           nullable: true
 *           description: Program name (optional)
 *           example: "CS"
 *         enrollment_year:
 *           type: integer
 *           minimum: 1900
 *           maximum: 2100
 *           description: Year of enrollment (optional)
 *           example: 2023
 */
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
