import Joi from "joi";
import { Enrollment } from "../models/Enrollment_model";

/**
 * @openapi
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - Enrollment_date
 *         - Enrollment_status
 *       properties:
 *         Enrollment_number:
 *           type: integer
 *           description: Auto-generated enrollment ID
 *           example: 5001
 *         Enrollment_date:
 *           type: string
 *           format: date-time
 *           description: Date of enrollment
 *           example: "2025-11-12"
 *         Enrollment_status:
 *           type: string
 *           enum: [active, completed, cancelled]
 *           description: Current status of enrollment
 *           example: "active"
 */

export const createEnrollmentSchema = Joi.object<Enrollment>({
  Enrollment_number: Joi.number().optional(), // assigned by controller
  Enrollment_date: Joi.string().isoDate().required(),
  Enrollment_status: Joi.string().valid("active", "completed", "cancelled").required(),
});

export const updateEnrollmentSchema = Joi.object<Partial<Enrollment>>({
  Enrollment_date: Joi.string().isoDate(),
  Enrollment_status: Joi.string().valid("active", "completed", "cancelled"),
});
