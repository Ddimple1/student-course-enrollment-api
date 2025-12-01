import Joi from "joi";
import { Course } from "../models/Course_model";

/**
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - Course_Name
 *         - Course_description
 *         - Course_credit
 *         - Course_duration
 *       properties:
 *         Course_id:
 *           type: integer
 *           description: Auto-generated course ID
 *           example: 101
 *         Course_Name:
 *           type: string
 *           minLength: 1
 *           description: Name of the course
 *           example: "Intro to Programming"
 *         Course_description:
 *           type: string
 *           minLength: 3
 *           description: Brief description of the course
 *           example: "Learn the basics of programming"
 *         Course_credit:
 *           type: integer
 *           minimum: 0
 *           description: Credit value of the course
 *           example: 3
 *         Course_duration:
 *           type: integer
 *           minimum: 0
 *           description: Duration in weeks
 *           example: 12
 */

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
